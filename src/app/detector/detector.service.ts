import { Helper } from './../share/helper';
import { ResultCMS } from '../share/models/result-cms';
import { CMS } from '../share/models/cms';
import { DbService } from '../share/db.service';
import { Injectable } from '@angular/core';
import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';
import { remote, Cookie } from 'electron';

@Injectable()
export class DetectorService {
    constructor(
        private _db: DbService
    ) { }

    detectCMS(path: string): ResultCMS[] {
        const urls = readFileSync(path, { encoding: 'utf8' });
        const array = [];
        let rc: ResultCMS;
        for (const url of urls.split('\n')) {
            rc = new ResultCMS();
            rc.url = url;
            array.push(rc);
            this.sendHttpReqAndSearch(rc);
        }

        // it is done asyncly so the other stuff will be done by changing variables refrence
        return array;
    }

    private async sendHttpReqAndSearch(rc: ResultCMS) {
        // cant use angular httpClient because it wont get cookies
        const types = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8';
        try {
            const response = await fetch(rc.url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': types
                }
            });

            const status = response.status;

            rc.statusCode = status;
            // cant use response.statusText because it is not working
            rc.statusText = Helper.statusText(status);
            if (status === 200) {
                const body = await response.text();
                this.searchInCMSes(body, rc);
            } else {
                rc.loading = false;
            }
        } catch (ex) {
            rc.statusCode = -1;
            rc.statusText = 'probably a timeout (try with a proxy)';
            rc.loading = false;
            console.log('error', ex);
        }
    }

    private async searchInCMSes(body: string, rc: ResultCMS) {
        const db = this._db.db;
        const jsdom = new JSDOM(body);

        for (const cms of db.cmses) {
            if (rc.byElements === 'N/A') {
                rc.byElements = this.searchInNodes(jsdom, cms);
            }

            if (rc.byCookies === 'N/A') {
                rc.byCookies = await this.searchInCookies(cms, rc.url);
            }

            if (rc.byExtraKey === 'N/A') {
                rc.byExtraKey = this.searchInKeywords(cms, body);
            }

            if (
                rc.byElements !== 'N/A' &&
                rc.byCookies !== 'N/A' &&
                rc.byExtraKey !== 'N/A'
            ) {
                break;
            }
        }
        rc.loading = false;
    }

    private searchInNodes(jsdom: JSDOM, cms: CMS): string {
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

    private async searchInCookies(cms: CMS, url: string): Promise<string> {
        let result = 'N/A';

        // get cookies
        const session = remote.session;
        let cookies = await session.defaultSession.cookies.get({}) as any;
        // just for having autocomplete! :|
        cookies = cookies as Cookie[];

        const domainName = Helper.pureUrl(url);

        outer:
        for (const cookie of cms.cookies) {
            for (const c of cookies) {
                if (
                    (c.domain === domainName || c.domain === `www.${domainName}`) &&
                    c.name === cookie.key
                ) {
                    if (
                        (cookie.value && c.value.indexOf(cookie.value)) ||
                        !cookie.value
                    ) {
                        result = cms.name;
                        break outer;
                    }
                }
            }
        }

        return result;
    }

    private searchInKeywords(cms: CMS, body: string): string {
        let result = 'N/A';
        for (const keyword of cms.extraKeywords) {
            if (body.indexOf(keyword) !== -1) {
                result = cms.name;
                break;
            }
        }

        return result;
    }
}
