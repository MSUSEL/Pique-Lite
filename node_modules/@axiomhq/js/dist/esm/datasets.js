import HTTPClient from './httpClient.js';

var datasets;
(function (datasets) {
    datasets.TimestampField = '_time';
    class Service extends HTTPClient {
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
})(datasets || (datasets = {}));

export { datasets };
//# sourceMappingURL=datasets.js.map
