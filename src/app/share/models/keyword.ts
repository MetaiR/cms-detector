import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('Keyword')
export class Keyword {
    @JsonProperty('keyword_word', String, true)
    private _word: string = undefined;

    constructor(
        word?: string
    ) {
        this._word = word;
    }

    /**
     * Getter word
     * @return {string }
     */
    public get word(): string {
        return this._word;
    }

    /**
     * Setter word
     * @param {string } value
     */
    public set word(value: string) {
        this._word = value;
    }

}
