import { ResultCMS } from '../share/models/result-cms';
import { DetectorService } from './detector.service';
import { Component } from '@angular/core';

@Component({
  selector: 'rp-detector',
  templateUrl: './detector.component.html',
  styleUrls: ['./detector.component.scss'],
  providers: [
    DetectorService
  ]
})
export class DetectorComponent {
  path = '';
  pending = true;
  resultCMSes: ResultCMS[] = [];

  constructor(
    private _service: DetectorService
  ) { }

  submit() {
    if (this.path == null || this.path.trim().length === 0) {
      alert('please select one file');
      return;
    }

    this.resultCMSes = this._service.detectCMS(this.path);
    this.pending = false;
  }
}
