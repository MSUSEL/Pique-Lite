export declare const headerRateScope = "X-RateLimit-Scope";
export declare const headerAPILimit = "X-RateLimit-Limit";
export declare const headerAPIRateRemaining = "X-RateLimit-Remaining";
export declare const headerAPIRateReset = "X-RateLimit-Reset";
export declare const headerQueryLimit = "X-QueryLimit-Limit";
export declare const headerQueryRemaining = "X-QueryLimit-Remaining";
export declare const headerQueryReset = "X-QueryLimit-Reset";
export declare const headerIngestLimit = "X-IngestLimit-Limit";
export declare const headerIngestRemaining = "X-IngestLimit-Remaining";
export declare const headerIngestReset = "X-IngestLimit-Reset";
export declare enum LimitScope {
    unknown = "unknown",
    user = "user",
    organization = "organization",
    anonymous = "anonymous"
}
export declare enum LimitType {
    api = "api",
    query = "query",
    ingest = "ingest"
}
export declare class Limit {
    scope: LimitScope;
    type: LimitType;
    value: number;
    remaining: number;
    reset: Date;
    constructor(scope?: LimitScope, type?: LimitType, value?: number, remaining?: number, reset?: Date);
}
export declare function parseLimitFromResponse(response: Response): Limit;
export declare const limitKey: (type: LimitType, scope: LimitScope) => string;
//# sourceMappingURL=limit.d.ts.map