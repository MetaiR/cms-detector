import { JsonProperty, JsonObject } from 'json2typescript';

@JsonObject('Cookie')
export class Cookie {
    @JsonProperty('cookie_key', String, true)
    private _key: string = undefined;
    @JsonProperty('cookie_value', String, true)
    private _value: string = undefined;


    constructor(
        key?: string,
        value?: string
    ) {
        this._key = key;
        this._value = value;
    }

    /**
     * Getter key
     * @return {string }
     */
    public get key(): string {
        return this._key;
    }

    /**
     * Getter value
     * @return {string }
     */
    public get value(): string {
        return this._value;
    }

    /**
     * Setter key
     * @param {string } value
     */
    public set key(value: string) {
        this._key = value;
    }

    /**
     * Setter value
     * @param {string } value
     */
    public set value(value: string) {
        this._value = value;
    }

}
