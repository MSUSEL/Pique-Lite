'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fetchClient = require('./fetchClient.cjs');

const Version = 'AXIOM_VERSION';
const AxiomURL = 'https://api.axiom.co';
class HTTPClient {
    client;
    constructor({ orgId = '', token, url }) {
        if (!token) {
            console.warn('Missing Axiom token');
        }
        const baseUrl = url ?? AxiomURL;
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        };
        if (typeof window === 'undefined') {
            headers['User-Agent'] = 'axiom-js/' + Version;
        }
        if (orgId) {
            headers['X-Axiom-Org-Id'] = orgId;
        }
        this.client = new fetchClient.FetchClient({
            baseUrl,
            headers,
            timeout: 3000,
        });
    }
}

exports.default = HTTPClient;
//# sourceMappingURL=httpClient.cjs.map
