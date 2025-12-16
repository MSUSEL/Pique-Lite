/// <reference types="node" />
import { datasets } from './datasets.js';
import { users } from './users.js';
import { Batch } from './batch.js';
import HTTPClient, { ClientOptions } from './httpClient.js';
declare class BaseClient extends HTTPClient {
    datasets: datasets.Service;
    users: users.Service;
    localPath: string;
    onError: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    constructor(options: ClientOptions);
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
    ingestRaw: (dataset: string, data: string | Buffer | ReadableStream, contentType?: ContentType, contentEncoding?: ContentEncoding, options?: IngestOptions) => Promise<IngestStatus>;
    queryLegacy: (dataset: string, query: QueryLegacy, options?: QueryOptions) => Promise<QueryLegacyResult>;
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
    query: (apl: string, options?: QueryOptions) => Promise<QueryResult>;
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
    aplQuery: (apl: string, options?: QueryOptions) => Promise<QueryResult>;
}
/**
 * Axiom's client without batching events in the background.
 * In most cases you'll want to use the {@link Axiom} client instead.
 *
 *
 * @param options - The {@link ClientOptions} to configure authentication
 *
 */
export declare class AxiomWithoutBatching extends BaseClient {
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
    ingest(dataset: string, events: Array<object> | object, options?: IngestOptions): Promise<IngestStatus>;
}
/**
 * Axiom's default client that queues events in the background,
 * sends them asynchronously to the server every 1s or every 1000 events.
 *
 * @param options - The options passed to the client
 *
 */
export declare class Axiom extends BaseClient {
    batch: {
        [id: string]: Batch;
    };
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
    ingest: (dataset: string, events: Array<object> | object, options?: IngestOptions) => void;
    /**
     * Flushes all the events that have been queued in the background
     *
     * @remarks
     * calling `await flush()` will wait for all the events to be sent to the server
     * and is necessary to ensure data delivery.
     */
    flush: () => Promise<void>;
}
export declare enum ContentType {
    JSON = "application/json",
    NDJSON = "application/x-ndjson",
    CSV = "text/csv"
}
export declare enum ContentEncoding {
    Identity = "",
    GZIP = "gzip"
}
/**
 * Ingest options
 *
 */
export interface IngestOptions {
    /**
     * name of the field that contains the timestamp
     */
    timestampField?: string;
    /**
     * format of the timestamp
     */
    timestampFormat?: string;
    /**
     * delimiter used in the csv file
     */
    csvDelimiter?: string;
}
/**
 * Query result
 *
 */
export interface IngestStatus {
    /**
     * number of ingested events
     */
    ingested: number;
    /**
     * number of failed events
     */
    failed: number;
    /**
     * list of failed events
     */
    failures?: Array<IngestFailure>;
    /**
     * number of processed bytes
     */
    processedBytes: number;
    /**
     * number of blocks created
     */
    blocksCreated: number;
    /**
     * length of the write ahead log
     */
    walLength: number;
}
export interface IngestFailure {
    timestamp: string;
    error: string;
}
export interface QueryOptionsBase {
    streamingDuration?: string;
    noCache?: boolean;
}
export interface QueryOptions extends QueryOptionsBase {
    startTime?: string;
    endTime?: string;
}
export interface QueryLegacy {
    aggregations?: Array<Aggregation>;
    continuationToken?: string;
    cursor?: string;
    endTime: string;
    filter?: Filter;
    groupBy?: Array<string>;
    includeCursor?: boolean;
    limit?: number;
    order?: Array<Order>;
    project?: Array<Projection>;
    resolution: string;
    startTime: string;
    virtualFields?: Array<VirtualColumn>;
}
export interface Aggregation {
    argument?: any;
    field: string;
    op: AggregationOp;
}
export declare enum AggregationOp {
    Count = "count",
    Distinct = "distinct",
    Sum = "sum",
    Avg = "avg",
    Min = "min",
    Max = "max",
    Topk = "topk",
    Percentiles = "percentiles",
    Histogram = "histogram",
    Variance = "variance",
    Stdev = "stdev",
    ArgMin = "argmin",
    ArgMax = "argmax",
    MakeSet = "makeset",
    MakeSetIf = "makesetif",
    CountIf = "countif",
    CountDistinctIf = "distinctif"
}
export interface Filter {
    caseSensitive?: boolean;
    children?: Array<Filter>;
    field: string;
    op: FilterOp;
    value?: any;
}
export declare enum FilterOp {
    And = "and",
    Or = "or",
    Not = "not",
    Equal = "==",
    NotEqual = "!=",
    Exists = "exists",
    NotExists = "not-exists",
    GreaterThan = ">",
    GreaterThanOrEqualTo = ">=",
    LessThan = "<",
    LessThanOrEqualTo = "<=",
    Gt = "gt",
    Gte = "gte",
    Lt = "lt",
    Lte = "lte",
    StartsWith = "starts-with",
    NotStartsWith = "not-starts-with",
    EndsWith = "ends-with",
    NotEndsWith = "not-ends-with",
    Contains = "contains",
    NotContains = "not-contains",
    Regexp = "regexp",
    NotRegexp = "not-regexp"
}
export interface Order {
    desc: boolean;
    field: string;
}
export interface Projection {
    alias?: string;
    field: string;
}
export interface VirtualColumn {
    alias: string;
    expr: string;
}
export interface QueryLegacyResult {
    buckets: Timeseries;
    matches?: Array<Entry>;
    status: Status;
}
export interface QueryResult {
    request: QueryLegacy;
    buckets: Timeseries;
    datasetNames: string[];
    matches?: Array<Entry>;
    status: Status;
}
export interface Timeseries {
    series?: Array<Interval>;
    totals?: Array<EntryGroup>;
}
export interface Interval {
    endTime: string;
    groups?: Array<EntryGroup>;
    startTime: string;
}
export interface EntryGroup {
    aggregations?: Array<EntryGroupAgg>;
    group: {
        [key: string]: any;
    };
    id: number;
}
export interface EntryGroupAgg {
    op: string;
    value: any;
}
export interface Entry {
    _rowId: string;
    _sysTime: string;
    _time: string;
    data: {
        [key: string]: any;
    };
}
export interface Status {
    blocksExamined: number;
    continuationToken?: string;
    elapsedTime: number;
    isEstimate?: boolean;
    isPartial: boolean;
    maxBlockTime: string;
    messages?: Array<Message>;
    minBlockTime: string;
    numGroups: number;
    rowsExamined: number;
    rowsMatched: number;
    maxCursor: string;
    minCursor: string;
}
export interface Message {
    code?: string;
    count: number;
    msg: string;
    priority: string;
}
export interface Query {
    apl: string;
    startTime?: string;
    endTime?: string;
}
export {};
//# sourceMappingURL=client.d.ts.map