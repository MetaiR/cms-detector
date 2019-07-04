import { Keyword } from './../share/models/keyword';
import { Cookie } from './../share/models/cookie';
import { El } from './../share/models/el';
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
  cms: CMS = new CMS(
    undefined,
    undefined,
    [new El()],
    [new Cookie()],
    [new Keyword()]
  );

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
    const c = cms ? clone<CMS>(cms, true) : new CMS(
      undefined,
      undefined,
      [new El()],
      [new Cookie()],
      [new Keyword()]
    );

    if (!c.els || c.els.length === 0) {
      c.els = [new El()];
    }

    if (!c.cookies || c.cookies.length === 0) {
      c.cookies = [new Cookie()];
    }

    if (!c.extraKeywords || c.extraKeywords.length === 0) {
      c.extraKeywords = [new Keyword()];
    }

    this.cms = c;
    this._modal.open();
  }

  addEntry(entryType: number) {
    const cms = this.cms;
    switch (entryType) {
      case 1:
        cms.els.push(new El());
        break;
      case 2:
        cms.cookies.push(new Cookie());
        break;
      case 3:
        cms.extraKeywords.push(new Keyword());
        break;
    }
  }

  removeEntry(entryType: number, index: number) {
    const cms = this.cms;
    switch (entryType) {
      case 1:
        cms.els.splice(index, 1);
        break;
      case 2:
        cms.cookies.splice(index, 1);
        break;
      case 3:
        cms.extraKeywords.splice(index, 1);
        break;
    }
  }

  save() {
    this.loading = false;
    this._modal.setBackDrop(false);
    const cms = this.cms;
    const filteredEls: El[] = [];
    const filteredCookies: Cookie[] = [];
    const filteredKeywords: Keyword[] = [];

    if (!cms.name || cms.name.trim().length === 0) {
      alert('please choose a name first');
      this.loading = false;
      this._modal.setBackDrop(true);
      return;
    }

    for (const el of cms.els) {
      if (
        (el.selector && el.selector.trim().length !== 0) &&
        (el.attribute && el.attribute.trim().length !== 0) &&
        (el.containsValue && el.containsValue.trim().length !== 0)
      ) {
        filteredEls.push(el);
      }
    }

    for (const cookie of cms.cookies) {
      if (cookie.key && cookie.key.trim().length !== 0) {
        if (cookie.value && cookie.value.trim().length === 0) {
          cookie.value = undefined;
        }
        filteredCookies.push(cookie);
      }
    }

    for (const keyword of cms.extraKeywords) {
      if (keyword && keyword.word.trim().length !== 0) {
        filteredKeywords.push(keyword);
      }
    }

    if (
      filteredCookies.length === 0 &&
      filteredEls.length === 0 &&
      filteredKeywords.length === 0
    ) {
      alert('please fill at least one card with correct values');
      this.loading = false;
      this._modal.setBackDrop(true);
      return;
    }

    cms.els = filteredEls;
    cms.cookies = filteredCookies;
    cms.extraKeywords = filteredKeywords;

    this.db = this._dbService.saveOrUpdateCMS(cms);

    this._modal.setBackDrop(true);
    this._modal.close();

    this.loading = false;
  }
}
