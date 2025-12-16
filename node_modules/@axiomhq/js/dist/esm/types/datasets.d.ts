import HTTPClient from './httpClient.js';
export declare namespace datasets {
    const TimestampField = "_time";
    interface Dataset {
        id: number;
        name: string;
        description?: string;
        who?: string;
        created: string;
    }
    interface Field {
        name: string;
        description: string;
        type: string;
        unit: string;
        hidden: boolean;
    }
    interface TrimResult {
    }
    interface CreateRequest {
        name: string;
        description?: string;
    }
    interface UpdateRequest {
        description: string;
    }
    class Service extends HTTPClient {
        private readonly localPath;
        list: () => Promise<Dataset[]>;
        get: (id: string) => Promise<Dataset>;
        create: (req: CreateRequest) => Promise<Dataset>;
        update: (id: string, req: UpdateRequest) => Promise<Dataset>;
        delete: (id: string) => Promise<Response>;
        trim: (id: string, maxDurationStr: string) => Promise<TrimResult>;
    }
}
//# sourceMappingURL=datasets.d.ts.map