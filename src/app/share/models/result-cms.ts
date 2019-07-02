export class ResultCMS {
    private _url: string;
    private _byElements = 'N/A';
    private _byCookies = 'N/A';
    private _byExtraKey = 'N/A';
    private _statusText = 'N/A';
    private _statusCode: number;
    private _loading = true;

    /**
     * Getter url
     * @return {string}
     */
    public get url(): string {
        return this._url;
    }

    /**
     * Getter byElements
     * @return {string}
     */
    public get byElements(): string {
        return this._byElements;
    }

    /**
     * Getter byCookies
     * @return {string}
     */
    public get byCookies(): string {
        return this._byCookies;
    }

    /**
     * Getter statusCode
     * @return {number}
     */
    public get statusCode(): number {
        return this._statusCode;
    }

    /**
     * Setter url
     * @param {string} value
     */
    public set url(value: string) {
        this._url = value;
    }

    /**
     * Setter byElements
     * @param {string} value
     */
    public set byElements(value: string) {
        this._byElements = value;
    }

    /**
     * Setter byCookies
     * @param {string} value
     */
    public set byCookies(value: string) {
        this._byCookies = value;
    }

    /**
     * Setter statusCode
     * @param {number} value
     */
    public set statusCode(value: number) {
        this._statusCode = value;
    }

    /**
     * Getter loading
     * @return {boolean}
     */
    public get loading(): boolean {
        return this._loading;
    }

    /**
     * Setter loading
     * @param {boolean} value
     */
    public set loading(value: boolean) {
        this._loading = value;
    }

    /**
     * Getter statusText
     * @return {string }
     */
    public get statusText(): string {
        return this._statusText;
    }

    /**
     * Setter statusText
     * @param {string } value
     */
    public set statusText(value: string) {
        this._statusText = value;
    }

    /**
     * Getter byExtraKey
     * @return {string }
     */
    public get byExtraKey(): string {
        return this._byExtraKey;
    }

    /**
     * Setter byExtraKey
     * @param {string } value
     */
    public set byExtraKey(value: string) {
        this._byExtraKey = value;
    }

}
