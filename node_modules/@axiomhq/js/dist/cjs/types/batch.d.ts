/// <reference types="node" />
import { IngestOptions, IngestStatus } from './client.js';
export type IngestFunction = (id: string, events: Array<object> | object, options?: IngestOptions) => Promise<IngestStatus>;
export declare function createBatchKey(id: string, options?: IngestOptions): string;
export declare class Batch {
    ingestFn: IngestFunction;
    id: string;
    options?: IngestOptions;
    events: Array<object>;
    activeFlush: Promise<IngestStatus | void>;
    nextFlush: NodeJS.Timeout;
    lastFlush: Date;
    constructor(ingestFn: IngestFunction, id: string, options?: IngestOptions);
    ingest: (events: Array<object> | object) => void;
    flush: () => Promise<IngestStatus | undefined>;
}
//# sourceMappingURL=batch.d.ts.map