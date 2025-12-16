import HTTPClient from './httpClient.js';
export declare namespace users {
    interface User {
        id: string;
        name: string;
        emails: Array<string>;
    }
    class Service extends HTTPClient {
        current: () => Promise<User>;
    }
}
//# sourceMappingURL=users.d.ts.map