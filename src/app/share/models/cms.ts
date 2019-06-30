// we should write undefined incase of using 3rd library like json2typescript
import { El } from './el';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('CMS')
export class CMS {
    @JsonProperty('cms_property', String, true)
    private _name: string = undefined;
    @JsonProperty('cms_el', [El], true)
    private _els: El[] = [];

    constructor(
        name?: string,
        els?: El[]
    ) {
        this._name = name;
        this._els = els ? els : [];
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

}
