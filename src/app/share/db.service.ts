import { DB } from './models/db';
import { CMS } from './models/cms';
import { El } from './models/el';
import { Injectable, NgZone } from '@angular/core';
import { existsSync, readFileSync, writeFile } from 'fs-extra';
import { JsonConvert, ValueCheckingMode } from 'json2typescript';
import * as os from 'os';
import { mkdir } from 'fs';

@Injectable()
export class DbService {
    constructor(
        private _zone: NgZone
    ) { }

    private static db: DB;
    private static jsonConvert: JsonConvert;

    get jConverter(): JsonConvert {
        let jConverter = DbService.jsonConvert;
        if (!jConverter) {
            jConverter = new JsonConvert();
            jConverter.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
            DbService.jsonConvert = jConverter;
        }

        return jConverter;
    }

    get db(): DB {
        return DbService.db;
    }

    set db(db: DB) {
        DbService.db = db;
    }

    loadOrGenerateDB() {
        const separator = this.getSeparator();

        const dbLocation = `${os.homedir()}${separator}.cms-detector${separator}db.json`;
        const dbExisted = existsSync(dbLocation);

        if (dbExisted) {
            // loading db settings
            this.loadDB(dbLocation);
        } else {
            // generate one
            this.generateAndLoadDB(dbLocation);
        }
    }

    private loadDB(path: string) {
        const str = readFileSync(path, { encoding: 'utf8' });
        const json = JSON.parse(str);
        const db = this.jConverter.deserialize(json, DB) as DB;

        this.db = db;
    }

    private generateAndLoadDB(path: string) {
        const el1 = new El(
            'meta[name="GENERATOR"]',
            'content',
            'DotNetNuke'
        );
        const cms = new CMS('DotNetNuke (DNN)', [el1]);
        const db = new DB([cms]);

        this.db = db;

        const json = this.jConverter.serialize(db);
        const str = JSON.stringify(json);

        this._zone.runOutsideAngular(
            () => {
                const separator = this.getSeparator();
                const arr = path.split(separator);
                arr.splice(arr.length - 1, 1);
                const directory = arr.join(separator);

                if (!existsSync(directory)) {
                    mkdir(directory, { recursive: true }, (err) => {
                        writeFile(path, str, { encoding: 'utf8' });
                    });
                }
            }
        );
    }

    private getSeparator() {
        return os.platform() === 'win32' ? '\\' : '/';
    }
}
