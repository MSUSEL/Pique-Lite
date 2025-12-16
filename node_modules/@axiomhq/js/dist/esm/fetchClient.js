import fetchRetry from 'fetch-retry';
import { parseLimitFromResponse, LimitType } from './limit.js';

class FetchClient {
    config;
    constructor(config) {
        this.config = config;
    }
    async doReq(endpoint, method, init = {}, searchParams = {}) {
        let finalUrl = `${this.config.baseUrl}${endpoint}`;
        const params = this._prepareSearchParams(searchParams);
        if (params) {
            finalUrl += `?${params.toString()}`;
        }
        const headers = { ...this.config.headers, ...init.headers };
        const resp = await fetchRetry(fetch)(finalUrl, {
            retries: 1,
            retryDelay: function (attempt, error, response) {
                return Math.pow(2, attempt) * 1000; // 1000, 2000, 4000
            },
            retryOn: [503, 502, 504, 500],
            headers,
            method,
            body: init.body ? init.body : undefined,
        });
        if (resp.status === 204) {
            return resp;
        }
        else if (resp.status == 429) {
            const limit = parseLimitFromResponse(resp);
            return Promise.reject(new AxiomTooManyRequestsError(limit));
        }
        else if (resp.status === 401) {
            return Promise.reject(new Error('Forbidden'));
        }
        else if (resp.status >= 400) {
            const payload = (await resp.json());
            return Promise.reject(new Error(payload.message));
        }
        return (await resp.json());
    }
    post(url, init = {}, searchParams = {}) {
        return this.doReq(url, 'POST', init, searchParams);
    }
    get(url, init = {}, searchParams = {}) {
        return this.doReq(url, 'GET', init, searchParams);
    }
    put(url, init = {}, searchParams = {}) {
        return this.doReq(url, 'PUT', init, searchParams);
    }
    delete(url, init = {}, searchParams = {}) {
        return this.doReq(url, 'DELETE', init, searchParams);
    }
    _prepareSearchParams = (searchParams) => {
        const params = new URLSearchParams();
        let hasParams = false;
        Object.keys(searchParams).forEach((k) => {
            if (searchParams[k]) {
                params.append(k, searchParams[k]);
                hasParams = true;
            }
        });
        return hasParams ? params : null;
    };
}
class AxiomTooManyRequestsError extends Error {
    limit;
    shortcircuit;
    message = '';
    constructor(limit, shortcircuit = false) {
        super();
        this.limit = limit;
        this.shortcircuit = shortcircuit;
        Object.setPrototypeOf(this, AxiomTooManyRequestsError.prototype); // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
        const retryIn = AxiomTooManyRequestsError.timeUntilReset(limit);
        this.message = `${limit.type} limit exceeded, try again in ${retryIn.minutes}m${retryIn.seconds}s`;
        if (limit.type == LimitType.api) {
            this.message = `${limit.scope} ` + this.message;
        }
    }
    static timeUntilReset(limit) {
        const total = limit.reset.getTime() - new Date().getTime();
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        return {
            total,
            minutes,
            seconds,
        };
    }
}

export { AxiomTooManyRequestsError, FetchClient };
//# sourceMappingURL=fetchClient.js.map
