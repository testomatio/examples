export default class Basic {
    private url: string;

    public constructor() {
        this.url = 'https://playwright.dev/';
    }

    public basicPageUrl(): string {
        return this.url;
    }
}