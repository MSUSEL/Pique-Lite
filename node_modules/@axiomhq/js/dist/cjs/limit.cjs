'use strict';

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
exports.LimitScope = void 0;
(function (LimitScope) {
    LimitScope["unknown"] = "unknown";
    LimitScope["user"] = "user";
    LimitScope["organization"] = "organization";
    LimitScope["anonymous"] = "anonymous";
})(exports.LimitScope || (exports.LimitScope = {}));
exports.LimitType = void 0;
(function (LimitType) {
    LimitType["api"] = "api";
    LimitType["query"] = "query";
    LimitType["ingest"] = "ingest";
})(exports.LimitType || (exports.LimitType = {}));
class Limit {
    scope;
    type;
    value;
    remaining;
    reset;
    constructor(scope = exports.LimitScope.unknown, type = exports.LimitType.api, value = 0, remaining = -1, reset = new Date()) {
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
        limit.type = exports.LimitType.ingest;
    }
    else if (response.url?.endsWith('/query') || response.url?.endsWith('/_apl')) {
        limit = parseLimitFromHeaders(response, '', headerQueryLimit, headerQueryRemaining, headerQueryReset);
        limit.type = exports.LimitType.query;
    }
    else {
        limit = parseLimitFromHeaders(response, headerRateScope, headerAPILimit, headerAPIRateRemaining, headerAPIRateReset);
        limit.type = exports.LimitType.api;
    }
    return limit;
}
// parseLimitFromHeaders parses the named headers from a `*http.Response`.
function parseLimitFromHeaders(response, headerScope, headerLimit, headerRemaining, headerReset) {
    let limit = new Limit();
    const scope = response.headers.get(headerScope.toLowerCase()) || exports.LimitScope.unknown;
    limit.scope = exports.LimitScope[scope];
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

exports.Limit = Limit;
exports.headerAPILimit = headerAPILimit;
exports.headerAPIRateRemaining = headerAPIRateRemaining;
exports.headerAPIRateReset = headerAPIRateReset;
exports.headerIngestLimit = headerIngestLimit;
exports.headerIngestRemaining = headerIngestRemaining;
exports.headerIngestReset = headerIngestReset;
exports.headerQueryLimit = headerQueryLimit;
exports.headerQueryRemaining = headerQueryRemaining;
exports.headerQueryReset = headerQueryReset;
exports.headerRateScope = headerRateScope;
exports.parseLimitFromResponse = parseLimitFromResponse;
//# sourceMappingURL=limit.cjs.map
