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
    private _db: DbService
  ) { }

  ngOnInit() {
    this.db = this._db.db;
  }

}
