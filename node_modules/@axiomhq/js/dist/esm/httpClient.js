import { FetchClient } from './fetchClient.js';

const Version = '1.0.0-rc.3';
const AxiomURL = 'https://api.axiom.co';
class HTTPClient {
    client;
    constructor({ orgId = '', token, url }) {
        if (!token) {
            console.warn('Missing Axiom token');
        }
        const baseUrl = url ?? AxiomURL;
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        };
        if (typeof window === 'undefined') {
            headers['User-Agent'] = 'axiom-js/' + Version;
        }
        if (orgId) {
            headers['X-Axiom-Org-Id'] = orgId;
        }
        this.client = new FetchClient({
            baseUrl,
            headers,
            timeout: 3000,
        });
    }
}

export { HTTPClient as default };
//# sourceMappingURL=httpClient.js.map
