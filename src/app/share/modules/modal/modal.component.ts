import { Component, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

declare const $: any;

@Component({
    moduleId: module.id,
    selector: 'rp-modal, [rp-modal]',
    templateUrl: './modal.component.html',
    styleUrls: [
        './modal.component.scss'
    ]
})
export class ModalComponent {
    @Output() afterOpen = new EventEmitter<void>();
    @Output() afterClosed = new EventEmitter<void>();
    @Output() beforOpen = new EventEmitter<void>();
    @Output() beforClose = new EventEmitter<void>();

    @ViewChild('modal', { static: false }) private _modal: ElementRef;
    private _opened = false;

    public open() {
        this.beforOpen.emit();

        $(this._modal.nativeElement).modal('show');

        this._opened = true;

        of(null).pipe(delay(5)).subscribe(
            () => this.afterOpen.emit()
        );
    }

    public close() {
        this.beforClose.emit();

        $(this._modal.nativeElement).modal('hide');

        this._opened = true;

        of(null).pipe(delay(5)).subscribe(
            () => this.afterClosed.emit()
        );
    }

    public isOpened(): boolean {
        return this._opened;
    }

    public toggle() {
        if (this._opened) {
            this.close();
        } else {
            this.open();
        }
    }

    public setBackDrop(enabled: boolean) {
        $(this._modal.nativeElement).modal({ backdrop: enabled });
    }
}
