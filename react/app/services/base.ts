export interface ServicesConfig {
    apiKey: string;
}

export default class BaseServices {
    protected readonly headers: Record<string, string>;
    
    constructor(protected config: ServicesConfig) {
        if (!this.config.apiKey) {
            throw new Error('API key is required');
        }
        this.headers = {
            "Authorization": `Bearer ${this.config.apiKey}`,
        };
    }
}