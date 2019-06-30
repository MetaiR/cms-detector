import { DbService } from './share/db.service';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'rp-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        private _db: DbService
    ) {}

    ngOnInit() {
        // init or load db
        this._db.loadOrGenerateDB();
    }
}
