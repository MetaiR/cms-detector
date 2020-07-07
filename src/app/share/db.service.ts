import {Keyword} from './models/keyword';
import {Cookie} from './models/cookie';
import {DB} from './models/db';
import {CMS} from './models/cms';
import {El} from './models/el';
import {Injectable, NgZone} from '@angular/core';
import {existsSync, mkdir, mkdirSync, readFileSync, writeFile, writeFileSync} from 'fs';
import {JsonConvert, ValueCheckingMode} from 'json2typescript';
import * as os from 'os';
import {v4} from 'uuid';
import * as clone from 'clone';

@Injectable()
export class DbService {
    constructor(
        private _zone: NgZone
    ) {
        const separator = DbService.getSeparator();
        DbService.dbLocation = `${os.homedir()}${separator}.cms-detector${separator}db.json`;
    }

    private static dbLocation: string;
    private static db: DB;
    private static jsonConvert: JsonConvert;

    private static writeSync(path: string, str: string) {
        writeFileSync(path, str, { encoding: 'utf8', flag: 'w' });
    }

    private static errorAlert() {
        alert('there is an error when we try to create ur databse');
    }

    private static getSeparator() {
        return os.platform() === 'win32' ? '\\' : '/';
    }

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

    saveOrUpdateCMS(cms: CMS): DB {
        let db: DB;
        if (cms.id) {
            db = this.updateCms(cms);
        } else {
            db = this.saveCms(cms);
        }

        return db;
    }

    saveCms(cms: CMS): DB {
        cms.id = v4();

        const db = clone<DB>(this.db, true);
        db.cmses.push(cms);
        this.generateAndLoadDB(false, db);

        return db;
    }

    updateCms(cms: CMS): DB {
        let db = this.db;

        // because the cms is a clone of the real one we can't use indexOf or any feature
        // that depends on references, so lets do it in the old fashioned way :D
        let index = -1;

        for (let i = 0; i < db.cmses.length; i++) {
            if (db.cmses[i].id === cms.id) {
                index = i;
                break;
            }
        }

        if (index !== -1) {
            db = clone<DB>(this.db, true);
            db.cmses.splice(index, 1);
            db.cmses.splice(index, 0, cms);
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
        this.db = this.jConverter.deserialize(json, DB) as DB;
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

            const keyword1 = new Keyword('DNN Platform');

            const dotNetNuke = new CMS(v4(), 'DotNetNuke (DNN)', [el1], [cookie1, cookie2], [keyword1]);

            const wpEl1 = new El(
                'meta[name="generator"]',
                'content',
                'WordPress'
            );

            const wpEl2 = new El(
                'body',
                'class',
                'woocommerce'
            );

            const wpEl3 = new El(
                'p',
                'class',
                'woocommerce'
            );

            const wpKeyword1 = new Keyword('yoast');
            const wpKeyword2 = new Keyword('wordpress');

            const wordpress = new CMS(v4(), 'WordPress', [wpEl1, wpEl2, wpEl3], [], [wpKeyword1, wpKeyword2]);

            db = new DB([wordpress, dotNetNuke]);
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
        const separator = DbService.getSeparator();
        const arr = path.split(separator);
        arr.splice(arr.length - 1, 1);
        const directory = arr.join(separator);

        const existed = existsSync(directory);

        if (async) {
            if (!existed) {
                mkdir(directory, { recursive: true }, (err) => {
                    if (err) {
                        DbService.errorAlert();
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
                    DbService.writeSync(path, str);
                } else {
                    DbService.writeSync(path, str);
                }
            } catch (e) {
                DbService.errorAlert();
            }
        }
    }

    private writeAsync(path: string, str: string) {
        writeFile(path, str, { encoding: 'utf8', flag: 'w' }, (e) => {
            if (e) {
                DbService.errorAlert();
                return;
            }
        });
    }
}
