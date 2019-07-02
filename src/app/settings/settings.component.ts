import { CMS } from './../share/models/cms';
import { Component, OnInit } from '@angular/core';
import { DbService } from '../share/db.service';
import { DB } from '../share/models/db';

@Component({
  selector: 'rp-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  db: DB;
  loading = false;

  constructor(
    private _dbService: DbService
  ) { }

  ngOnInit() {
    this.db = this._dbService.db;
  }

  deleteCMS(cms: CMS) {
    if (confirm('Are u sure?')) {
      this.loading = true;

      this.db = this._dbService.deleteCMSFormDB(cms);
    }

    this.loading = false;
  }
}
