'use strict';

var httpClient = require('./httpClient.cjs');

exports.datasets = void 0;
(function (datasets) {
    datasets.TimestampField = '_time';
    class Service extends httpClient.default {
        localPath = '/v1/datasets';
        list = () => this.client.get(this.localPath);
        get = (id) => this.client.get(this.localPath + '/' + id);
        create = (req) => this.client.post(this.localPath, { body: JSON.stringify(req) });
        update = (id, req) => this.client.put(this.localPath + '/' + id, { body: JSON.stringify(req) });
        delete = (id) => this.client.delete(this.localPath + '/' + id);
        trim = (id, maxDurationStr) => {
            // Go's 'time.Duration' uses nanoseconds as its base unit. So parse the
            // duration string and convert to nanoseconds. 1ms = 1000000ns.
            const req = { maxDuration: maxDurationStr };
            return this.client.post(this.localPath + '/' + id + '/trim', { body: JSON.stringify(req) });
        };
    }
    datasets.Service = Service;
})(exports.datasets || (exports.datasets = {}));
//# sourceMappingURL=datasets.cjs.map
