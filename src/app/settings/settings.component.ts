import { CMS } from './../share/models/cms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DbService } from '../share/db.service';
import { DB } from '../share/models/db';
import { ModalComponent } from '../share/modules/modal/modal.component';
import * as clone from 'clone';

@Component({
  selector: 'rp-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  db: DB;
  loading = false;
  cms: CMS = new CMS();

  @ViewChild(ModalComponent, { static: false }) private _modal: ModalComponent;

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

  openModal(cms?: CMS) {
    this.cms = cms ? clone<CMS>(cms, true) : new CMS();
    this._modal.open();
  }
}
