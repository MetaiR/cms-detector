import { Directive, Input, HostListener } from '@angular/core';
import { ModalComponent } from './modal.component';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[rp-close-modal]'
})
export class CloseModalDirective {
    @Input('rp-close-modal') private _modal: ModalComponent;
    @HostListener('click') onClick() {
        this._modal.close();
    }
}
