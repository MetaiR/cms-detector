import { CMS } from './cms';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('DB')
export class DB {
    @JsonProperty('db_cms', [CMS], true)
    private _cmses: CMS[] = [];

    constructor(
        cmses?: CMS[]
    ) {
        this._cmses = cmses ? cmses : [];
    }

    /**
     * Getter cmses
     * @return {CMS[] }
     */
    public get cmses(): CMS[] {
        return this._cmses;
    }

    /**
     * Setter cmses
     * @param {CMS[] } value
     */
    public set cmses(value: CMS[]) {
        this._cmses = value;
    }

}
