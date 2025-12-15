import { RequestInitWithRetry } from 'fetch-retry';
import { Limit } from './limit.js';
export declare class FetchClient {
    config: {
        headers: HeadersInit;
        baseUrl: string;
        timeout: number;
    };
    constructor(config: {
        headers: HeadersInit;
        baseUrl: string;
        timeout: number;
    });
    doReq<T>(endpoint: string, method: string, init?: RequestInitWithRetry, searchParams?: {
        [key: string]: string;
    }): Promise<T>;
    post<T>(url: string, init?: RequestInitWithRetry, searchParams?: any): Promise<T>;
    get<T>(url: string, init?: RequestInitWithRetry, searchParams?: any): Promise<T>;
    put<T>(url: string, init?: RequestInitWithRetry, searchParams?: any): Promise<T>;
    delete<T>(url: string, init?: RequestInitWithRetry, searchParams?: any): Promise<T>;
    _prepareSearchParams: (searchParams: {
        [key: string]: string;
    }) => URLSearchParams | null;
}
export declare class AxiomTooManyRequestsError extends Error {
    limit: Limit;
    shortcircuit: boolean;
    message: string;
    constructor(limit: Limit, shortcircuit?: boolean);
    static timeUntilReset(limit: Limit): {
        total: number;
        minutes: number;
        seconds: number;
    };
}
//# sourceMappingURL=fetchClient.d.ts.map