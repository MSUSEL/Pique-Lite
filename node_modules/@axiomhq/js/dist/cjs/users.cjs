'use strict';

var httpClient = require('./httpClient.cjs');

exports.users = void 0;
(function (users) {
    class Service extends httpClient.default {
        current = () => this.client.get('/v1/user');
    }
    users.Service = Service;
})(exports.users || (exports.users = {}));
//# sourceMappingURL=users.cjs.map
