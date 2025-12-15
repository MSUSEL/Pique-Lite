const headerRateScope = 'X-RateLimit-Scope';
const headerAPILimit = 'X-RateLimit-Limit';
const headerAPIRateRemaining = 'X-RateLimit-Remaining';
const headerAPIRateReset = 'X-RateLimit-Reset';
const headerQueryLimit = 'X-QueryLimit-Limit';
const headerQueryRemaining = 'X-QueryLimit-Remaining';
const headerQueryReset = 'X-QueryLimit-Reset';
const headerIngestLimit = 'X-IngestLimit-Limit';
const headerIngestRemaining = 'X-IngestLimit-Remaining';
const headerIngestReset = 'X-IngestLimit-Reset';
var LimitScope;
(function (LimitScope) {
    LimitScope["unknown"] = "unknown";
    LimitScope["user"] = "user";
    LimitScope["organization"] = "organization";
    LimitScope["anonymous"] = "anonymous";
})(LimitScope || (LimitScope = {}));
var LimitType;
(function (LimitType) {
    LimitType["api"] = "api";
    LimitType["query"] = "query";
    LimitType["ingest"] = "ingest";
})(LimitType || (LimitType = {}));
class Limit {
    scope;
    type;
    value;
    remaining;
    reset;
    constructor(scope = LimitScope.unknown, type = LimitType.api, value = 0, remaining = -1, reset = new Date()) {
        this.scope = scope;
        this.type = type;
        this.value = value;
        this.remaining = remaining;
        this.reset = reset;
    }
}
// parse limit headers from axios response and return a limit object
function parseLimitFromResponse(response) {
    let limit;
    if (response.url?.endsWith('/ingest')) {
        limit = parseLimitFromHeaders(response, '', headerIngestLimit, headerIngestRemaining, headerIngestReset);
        limit.type = LimitType.ingest;
    }
    else if (response.url?.endsWith('/query') || response.url?.endsWith('/_apl')) {
        limit = parseLimitFromHeaders(response, '', headerQueryLimit, headerQueryRemaining, headerQueryReset);
        limit.type = LimitType.query;
    }
    else {
        limit = parseLimitFromHeaders(response, headerRateScope, headerAPILimit, headerAPIRateRemaining, headerAPIRateReset);
        limit.type = LimitType.api;
    }
    return limit;
}
// parseLimitFromHeaders parses the named headers from a `*http.Response`.
function parseLimitFromHeaders(response, headerScope, headerLimit, headerRemaining, headerReset) {
    let limit = new Limit();
    const scope = response.headers.get(headerScope.toLowerCase()) || LimitScope.unknown;
    limit.scope = LimitScope[scope];
    const limitValue = response.headers.get(headerLimit.toLowerCase()) || '';
    const limitValueNumber = parseInt(limitValue, 10);
    if (!isNaN(limitValueNumber)) {
        limit.value = limitValueNumber;
    }
    const remainingValue = response.headers.get(headerRemaining.toLowerCase()) || '';
    const remainingValueNumber = parseInt(remainingValue, 10);
    if (!isNaN(remainingValueNumber)) {
        limit.remaining = remainingValueNumber;
    }
    const resetValue = response.headers.get(headerReset.toLowerCase()) || '';
    const resetValueInt = parseInt(resetValue, 10);
    if (!isNaN(resetValueInt)) {
        limit.reset = new Date(resetValueInt * 1000);
    }
    return limit;
}

export { Limit, LimitScope, LimitType, headerAPILimit, headerAPIRateRemaining, headerAPIRateReset, headerIngestLimit, headerIngestRemaining, headerIngestReset, headerQueryLimit, headerQueryRemaining, headerQueryReset, headerRateScope, parseLimitFromResponse };
//# sourceMappingURL=limit.js.map
