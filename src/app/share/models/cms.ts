// we should write undefined incase of using 3rd library like json2typescript
import { Cookie } from './cookie';
import { El } from './el';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('CMS')
export class CMS {
    @JsonProperty('cms_property', String, true)
    private _name: string = undefined;
    @JsonProperty('cms_el', [El], true)
    private _els: El[] = [];
    @JsonProperty('cms_cookie', [Cookie], true)
    private _cookies: Cookie[] = [];
    @JsonProperty('cms_extra_keyword', [String], true)
    private _extraKeywords: string[] = [];

    constructor(
        name?: string,
        els?: El[],
        cookies?: Cookie[],
        extraKeywords?: string[]
    ) {
        this._name = name;
        this._els = els ? els : [];
        this._cookies = cookies ? cookies : [];
        this._extraKeywords = extraKeywords ? extraKeywords : [];
    }

    /**
     * Getter name
     * @return {string }
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Getter els
     * @return {El[] }
     */
    public get els(): El[] {
        return this._els;
    }

    /**
     * Setter name
     * @param {string } value
     */
    public set name(value: string) {
        this._name = value;
    }

    /**
     * Setter els
     * @param {El[] } value
     */
    public set els(value: El[]) {
        this._els = value;
    }


    /**
     * Getter cookies
     * @return {Cookie[] }
     */
    public get cookies(): Cookie[] {
        return this._cookies;
    }

    /**
     * Setter cookies
     * @param {Cookie[] } value
     */
    public set cookies(value: Cookie[]) {
        this._cookies = value;
    }

    /**
     * Getter extraKeywords
     * @return {string[] }
     */
    public get extraKeywords(): string[] {
        return this._extraKeywords;
    }

    /**
     * Setter extraKeywords
     * @param {string[] } value
     */
    public set extraKeywords(value: string[]) {
        this._extraKeywords = value;
    }


}
