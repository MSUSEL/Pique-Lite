import HTTPClient from './httpClient.js';

var users;
(function (users) {
    class Service extends HTTPClient {
        current = () => this.client.get('/v1/user');
    }
    users.Service = Service;
})(users || (users = {}));

export { users };
//# sourceMappingURL=users.js.map
