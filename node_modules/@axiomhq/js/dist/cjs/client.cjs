'use strict';

var datasets = require('./datasets.cjs');
var users = require('./users.cjs');
var batch = require('./batch.cjs');
var httpClient = require('./httpClient.cjs');

class BaseClient extends httpClient.default {
    datasets;
    users;
    localPath = '/v1';
    onError = console.error;
    constructor(options) {
        super(options);
        this.datasets = new datasets.datasets.Service(options);
        this.users = new users.users.Service(options);
        if (options.onError) {
            this.onError = options.onError;
        }
    }
    /**
     * Ingest events into the provided dataset using raw data types, e.g: string, buffer or a stream.
     *
     * @param dataset - name of the dataset to ingest events into
     * @param data - data to be ingested
     * @param contentType - optional content type, defaults to JSON
     * @param contentEncoding - optional content encoding, defaults to Identity
     * @param options - optional ingest options
     * @returns result a promise of ingest and its status, check: {@link IngestStatus}
     *
     * @example
     * ```
     * import { AxiomWithoutBatching } from '@axiomhq/js';
     *
     * const axiom = new AxiomWithoutBatching();
     * ```
     *
     */
    ingestRaw = (dataset, data, contentType = exports.ContentType.JSON, contentEncoding = exports.ContentEncoding.Identity, options) => {
        return this.client.post(this.localPath + '/datasets/' + dataset + '/ingest', {
            headers: {
                'Content-Type': contentType,
                'Content-Encoding': contentEncoding,
            },
            body: data,
        }, {
            'timestamp-field': options?.timestampField,
            'timestamp-format': options?.timestampFormat,
            'csv-delimiter': options?.csvDelimiter,
        }).catch((err) => {
            this.onError(err);
            return Promise.resolve({
                ingested: 0,
                failed: 0,
                processedBytes: 0,
                blocksCreated: 0,
                walLength: 0,
            });
        });
    };
    queryLegacy = (dataset, query, options) => this.client.post(this.localPath + '/datasets/' + dataset + '/query', {
        body: JSON.stringify(query),
    }, {
        'streaming-duration': options?.streamingDuration,
        nocache: options?.noCache,
    });
    /**
     * Executes APL query using the provided APL and returns the result
     *
     * @param apl - the apl query
     * @param options - optional query options
     * @returns result of the query, check: {@link QueryResult}
     *
     * @example
     * ```
     * await axiom.query("['dataset'] | count");
     * ```
     *
     */
    query = (apl, options) => {
        const req = { apl: apl };
        if (options?.startTime) {
            req.startTime = options?.startTime;
        }
        if (options?.endTime) {
            req.endTime = options?.endTime;
        }
        return this.client.post(this.localPath + '/datasets/_apl', {
            body: JSON.stringify(req),
        }, {
            'streaming-duration': options?.streamingDuration,
            nocache: options?.noCache,
            format: 'legacy',
        });
    };
    /**
     * Executes APL query using the provided APL and returns the result.
     * This is just an alias for the `query()` method, please use that instead.
     *
     * @param apl - the apl query
     * @param options - optional query options
     * @returns Promise<QueryResult>
     *
     * @example
     * ```
     * await axiom.aplQuery("['dataset'] | count");
     * ```
     */
    aplQuery = (apl, options) => this.query(apl, options);
}
/**
 * Axiom's client without batching events in the background.
 * In most cases you'll want to use the {@link Axiom} client instead.
 *
 *
 * @param options - The {@link ClientOptions} to configure authentication
 *
 */
class AxiomWithoutBatching extends BaseClient {
    /**
     * Ingest event(s) asynchronously
     *
     * @param dataset - name of the dataset to ingest events into
     * @param events - list of events to be ingested, could be a single object as well
     * @param options - optional ingest options
     * @returns the result of the ingest, check: {@link IngestStatus}
     *
     * @example
     * ```
     * import { AxiomWithoutBatching } from '@axiomhq/js';
     *
     * const axiom = new AxiomWithoutBatching();
     * await axiom.ingest('dataset-name', [{ foo: 'bar' }])
     * ```
     *
     */
    async ingest(dataset, events, options) {
        const array = Array.isArray(events) ? events : [events];
        const json = array.map((v) => JSON.stringify(v)).join('\n');
        return this.ingestRaw(dataset, json, exports.ContentType.NDJSON, exports.ContentEncoding.Identity, options);
    }
}
/**
 * Axiom's default client that queues events in the background,
 * sends them asynchronously to the server every 1s or every 1000 events.
 *
 * @param options - The options passed to the client
 *
 */
class Axiom extends BaseClient {
    batch = {};
    /**
     * Ingest events asynchronously
     *
     * @remarks
     * Events passed to ingest method will be queued in a batch and sent
     * in the background every second or every 1000 events.
     *
     * @param dataset - name of the dataset to ingest events into
     * @param events - list of events to be ingested, could be a single object as well
     * @param options - optional ingest options
     * @returns void, as the events are sent in the background
     *
     */
    ingest = (dataset, events, options) => {
        const key = batch.createBatchKey(dataset, options);
        if (!this.batch[key]) {
            this.batch[key] = new batch.Batch((dataset, events, options) => {
                const array = Array.isArray(events) ? events : [events];
                const json = array.map((v) => JSON.stringify(v)).join('\n');
                return this.ingestRaw(dataset, json, exports.ContentType.NDJSON, exports.ContentEncoding.Identity, options);
            }, dataset, options);
        }
        return this.batch[key].ingest(events);
    };
    /**
     * Flushes all the events that have been queued in the background
     *
     * @remarks
     * calling `await flush()` will wait for all the events to be sent to the server
     * and is necessary to ensure data delivery.
     */
    flush = async () => {
        let promises = [];
        for (const key in this.batch) {
            promises.push(this.batch[key].flush().catch(this.onError));
        }
        await Promise.all(promises).catch(this.onError);
    };
}
exports.ContentType = void 0;
(function (ContentType) {
    ContentType["JSON"] = "application/json";
    ContentType["NDJSON"] = "application/x-ndjson";
    ContentType["CSV"] = "text/csv";
})(exports.ContentType || (exports.ContentType = {}));
exports.ContentEncoding = void 0;
(function (ContentEncoding) {
    ContentEncoding["Identity"] = "";
    ContentEncoding["GZIP"] = "gzip";
})(exports.ContentEncoding || (exports.ContentEncoding = {}));
exports.AggregationOp = void 0;
(function (AggregationOp) {
    AggregationOp["Count"] = "count";
    AggregationOp["Distinct"] = "distinct";
    AggregationOp["Sum"] = "sum";
    AggregationOp["Avg"] = "avg";
    AggregationOp["Min"] = "min";
    AggregationOp["Max"] = "max";
    AggregationOp["Topk"] = "topk";
    AggregationOp["Percentiles"] = "percentiles";
    AggregationOp["Histogram"] = "histogram";
    AggregationOp["Variance"] = "variance";
    AggregationOp["Stdev"] = "stdev";
    AggregationOp["ArgMin"] = "argmin";
    AggregationOp["ArgMax"] = "argmax";
    AggregationOp["MakeSet"] = "makeset";
    AggregationOp["MakeSetIf"] = "makesetif";
    AggregationOp["CountIf"] = "countif";
    AggregationOp["CountDistinctIf"] = "distinctif";
})(exports.AggregationOp || (exports.AggregationOp = {}));
exports.FilterOp = void 0;
(function (FilterOp) {
    FilterOp["And"] = "and";
    FilterOp["Or"] = "or";
    FilterOp["Not"] = "not";
    FilterOp["Equal"] = "==";
    FilterOp["NotEqual"] = "!=";
    FilterOp["Exists"] = "exists";
    FilterOp["NotExists"] = "not-exists";
    FilterOp["GreaterThan"] = ">";
    FilterOp["GreaterThanOrEqualTo"] = ">=";
    FilterOp["LessThan"] = "<";
    FilterOp["LessThanOrEqualTo"] = "<=";
    FilterOp["Gt"] = "gt";
    FilterOp["Gte"] = "gte";
    FilterOp["Lt"] = "lt";
    FilterOp["Lte"] = "lte";
    FilterOp["StartsWith"] = "starts-with";
    FilterOp["NotStartsWith"] = "not-starts-with";
    FilterOp["EndsWith"] = "ends-with";
    FilterOp["NotEndsWith"] = "not-ends-with";
    FilterOp["Contains"] = "contains";
    FilterOp["NotContains"] = "not-contains";
    FilterOp["Regexp"] = "regexp";
    FilterOp["NotRegexp"] = "not-regexp";
})(exports.FilterOp || (exports.FilterOp = {}));

exports.Axiom = Axiom;
exports.AxiomWithoutBatching = AxiomWithoutBatching;
//# sourceMappingURL=client.cjs.map
