import { Directive, Input, HostListener } from '@angular/core';
import { ModalComponent } from './modal.component';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[rp-toggle-modal]'
})
export class ToggleModalDirective {
    @Input('rp-toggle-modal') private _modal: ModalComponent;
    @HostListener('click') onClick() {
        this._modal.toggle();
    }
}
