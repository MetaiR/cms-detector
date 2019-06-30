import { ResultCMS } from './../share/models/result-cms';
import { DetectorComponentService } from './detector-component.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rp-detector-component',
  templateUrl: './detector-component.component.html',
  styleUrls: ['./detector-component.component.scss'],
  providers: [
    DetectorComponentService
  ]
})
export class DetectorComponentComponent implements OnInit {
  path = 'C:\\Users\\Seyed\\Desktop\\New Text Document.txt';
  pending = true;
  resultCMSes: ResultCMS[] = [];

  constructor(
    private _service: DetectorComponentService
  ) { }

  ngOnInit() {

  }

  submit() {
    if (this.path == null || this.path.trim().length === 0) {
      alert('please select one file');
      return;
    }

    this.resultCMSes = this._service.detectCMS(this.path);
    this.pending = false;
  }
}
