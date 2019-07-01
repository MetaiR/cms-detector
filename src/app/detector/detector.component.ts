import { ResultCMS } from '../share/models/result-cms';
import { DetectorService } from './detector.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rp-detector',
  templateUrl: './detector.component.html',
  styleUrls: ['./detector.component.scss'],
  providers: [
    DetectorService
  ]
})
export class DetectorComponent implements OnInit {
  path = 'C:\\Users\\Seyed\\Desktop\\New Text Document.txt';
  pending = true;
  resultCMSes: ResultCMS[] = [];

  constructor(
    private _service: DetectorService
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
