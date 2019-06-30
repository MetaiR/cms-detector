import { ResultCMS } from './../share/models/result-cms';
import { CMS } from './../share/models/cms';
import { DbService } from './../share/db.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';

@Injectable()
export class DetectorComponentService {
    constructor(
        private _http: HttpClient,
        private _db: DbService
    ) { }

    getSite(url: string): Observable<HttpResponse<string>> {
        const types = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8';

        const headers = new HttpHeaders().set('Accept', types);

        return this._http.get(
            url,
            {
                observe: 'response',
                headers: headers,
                responseType: 'text',
                withCredentials: false
            }
        );
    }

    detectCMS(path: string): ResultCMS[] {
        const urls = readFileSync(path, { encoding: 'utf8' });
        const array = [];
        let rc: ResultCMS;
        for (const url of urls.split('\n')) {
            rc = new ResultCMS();
            rc.url = url;
            array.push(rc);
            this.sendHttpReq(rc);
        }

        return array;
    }

    sendHttpReq(rc: ResultCMS) {
        this.getSite(rc.url).subscribe(
            res => {
                rc.statusCode = res.status;
                const jsdom = new JSDOM(res.body);
                this.searchInCMS(jsdom, rc);
            },
            msg => rc.statusCode = msg.status
        );
    }

    searchInCMS(jsdom: JSDOM, rc: ResultCMS) {
        const db = this._db.db;
        for (const cms of db.cmses) {
            if (rc.byElements === 'N/A') {
                rc.byElements = this.searchInNodes(jsdom, cms);
            }

            if (rc.byElements !== 'N/A') {
                break;
            }
        }
        rc.loading = false;
    }

    searchInNodes(jsdom: JSDOM, cms: CMS): string {
        let result = 'N/A';
        for (const el of cms.els) {
            const element = jsdom.window.document.querySelector(el.selector);
            if (element) {
                const attrabiute = element.getAttribute(el.attribute);
                if (attrabiute && attrabiute.indexOf(el.containsValue) !== -1) {
                    result = cms.name;
                    break;
                }
            }
        }

        return result;
    }
}
