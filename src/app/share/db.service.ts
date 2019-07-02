import { Cookie } from './models/cookie';
import { DB } from './models/db';
import { CMS } from './models/cms';
import { El } from './models/el';
import { Injectable, NgZone } from '@angular/core';
import { existsSync, readFileSync, writeFile, mkdir, mkdirSync, writeFileSync } from 'fs';
import { JsonConvert, ValueCheckingMode } from 'json2typescript';
import * as os from 'os';
import { v4 } from 'uuid';
import * as clone from 'clone';

@Injectable()
export class DbService {
    constructor(
        private _zone: NgZone
    ) {
        const separator = this.getSeparator();
        this.dbLocation = `${os.homedir()}${separator}.cms-detector${separator}db.json`;
    }

    private static dbLocation: string;
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

    get dbLocation(): string {
        return DbService.dbLocation;
    }

    set dbLocation(dbLocation: string) {
        DbService.dbLocation = dbLocation;
    }

    deleteCMSFormDB(cms: CMS): DB {
        let db = this.db;
        const index = db.cmses.indexOf(cms);

        if (index !== -1) {
            db = clone<DB>(this.db, true);
            db.cmses.splice(index, 1);
            this.generateAndLoadDB(false, db);
        }

        return db;
    }

    loadOrGenerateDB() {
        const dbLocation = this.dbLocation;
        const dbExisted = existsSync(dbLocation);

        if (dbExisted) {
            // loading db settings
            this.loadDB();
        } else {
            // generate one
            this.generateAndLoadDB(true);
        }
    }

    private loadDB() {
        const path = this.dbLocation;
        const str = readFileSync(path, { encoding: 'utf8' });
        const json = JSON.parse(str);
        const db = this.jConverter.deserialize(json, DB) as DB;

        this.db = db;
    }

    private generateAndLoadDB(async = false, database?: DB) {
        let db: DB = database;
        if (!db) {
            const el1 = new El(
                'meta[name="GENERATOR"]',
                'content',
                'DotNetNuke'
            );

            const cookie1 = new Cookie('.DOTNETNUKE');
            const cookie2 = new Cookie('dnn_IsMobile');

            const keyword1 = 'DNN Platform';

            const cms = new CMS(v4(), 'DotNetNuke (DNN)', [el1], [cookie1, cookie2], [keyword1]);

            db = new DB([cms]);
        }

        const json = this.jConverter.serialize(db);
        const str = JSON.stringify(json);

        if (async) {
            this._zone.runOutsideAngular(
                () => {
                    this.writeOnDB(str, true);
                }
            );
        } else {
            this.writeOnDB(str);
        }

        this.db = db;
    }

    // this one is a little messy | sorry :D
    private writeOnDB(str: string, async = false) {
        const path = this.dbLocation;
        const separator = this.getSeparator();
        const arr = path.split(separator);
        arr.splice(arr.length - 1, 1);
        const directory = arr.join(separator);

        const existed = existsSync(directory);

        if (async) {
            if (!existed) {
                mkdir(directory, { recursive: true }, (err) => {
                    if (err) {
                        this.errorAlert();
                        return;
                    }
                    this.writeAsync(path, str);
                });
            } else {
                this.writeAsync(path, str);
            }
        } else {
            try {
                if (!existed) {
                    mkdirSync(directory, { recursive: true });
                    this.writeSync(path, str);
                } else {
                    this.writeSync(path, str);
                }
            } catch (e) {
                this.errorAlert();
            }
        }
    }

    private writeAsync(path: string, str: string) {
        writeFile(path, str, { encoding: 'utf8' }, (e) => {
            if (e) {
                this.errorAlert();
                return;
            }
        });
    }

    private writeSync(path: string, str: string) {
        writeFileSync(path, str, { encoding: 'utf8' });
    }

    private errorAlert() {
        alert('there is an error when we try to create ur databse');
    }

    private getSeparator() {
        return os.platform() === 'win32' ? '\\' : '/';
    }
}
