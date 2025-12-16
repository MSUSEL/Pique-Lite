'use strict';

function createBatchKey(id, options) {
    return `${id}:${options?.timestampField || '-'}:${options?.timestampFormat || '-'}:${options?.csvDelimiter || '-'}`;
}
class Batch {
    ingestFn;
    id;
    options;
    events = [];
    activeFlush = Promise.resolve();
    nextFlush = setTimeout(() => { }, 0);
    lastFlush = new Date();
    constructor(ingestFn, id, options) {
        this.ingestFn = ingestFn;
        this.id = id;
        this.options = options;
    }
    ingest = (events) => {
        if (Array.isArray(events)) {
            this.events = this.events.concat(events);
        }
        else {
            this.events.push(events);
        }
        if (this.events.length >= 1000 || this.lastFlush.getTime() < Date.now() - 1000) {
            // We either have more than 1k events or the last flush was more than 1s ago
            clearTimeout(this.nextFlush);
            this.activeFlush = this.flush();
        }
        else {
            // Create a timeout so we flush remaining events even if no more come in
            clearTimeout(this.nextFlush);
            this.nextFlush = setTimeout(() => {
                this.activeFlush = this.flush();
            }, 1000);
        }
    };
    flush = async () => {
        const events = this.events.splice(0, this.events.length);
        clearTimeout(this.nextFlush);
        await this.activeFlush;
        if (events.length === 0) {
            this.lastFlush = new Date(); // we tried
            return;
        }
        const res = await this.ingestFn(this.id, events, this.options);
        this.lastFlush = new Date();
        return res;
    };
}

exports.Batch = Batch;
exports.createBatchKey = createBatchKey;
//# sourceMappingURL=batch.cjs.map
