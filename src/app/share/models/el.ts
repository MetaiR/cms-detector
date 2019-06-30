import { JsonObject, JsonProperty } from 'json2typescript';

// we should write undefined incase of using 3rd library like json2typescript

@JsonObject('El')
export class El {
    @JsonProperty('el_selector', String, true)
    private _selector: string = undefined;
    @JsonProperty('el_attribute', String, true)
    private _attribute: string = undefined;
    @JsonProperty('el_contains_value', String, true)
    private _containsValue: string = undefined;

    constructor(
        selector?: string,
        attribute?: string,
        containsValue?: string
    ) {
        this._selector = selector;
        this._attribute = attribute;
        this._containsValue = containsValue;
    }

    /**
     * Getter selector
     * @return {string }
     */
    public get selector(): string {
        return this._selector;
    }

    /**
     * Getter attribute
     * @return {string }
     */
    public get attribute(): string {
        return this._attribute;
    }

    /**
     * Getter containsValue
     * @return {string }
     */
    public get containsValue(): string {
        return this._containsValue;
    }

    /**
     * Setter selector
     * @param {string } value
     */
    public set selector(value: string) {
        this._selector = value;
    }

    /**
     * Setter attribute
     * @param {string } value
     */
    public set attribute(value: string) {
        this._attribute = value;
    }

    /**
     * Setter containsValue
     * @param {string } value
     */
    public set containsValue(value: string) {
        this._containsValue = value;
    }

}
