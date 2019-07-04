import { Directive, Input, HostListener } from '@angular/core';
import { ModalComponent } from './modal.component';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[rp-open-modal]'
})
export class OpenModalDirective {
    @Input('rp-open-modal') private _modal: ModalComponent;
    @HostListener('click') onClick() {
        this._modal.open();
    }
}
