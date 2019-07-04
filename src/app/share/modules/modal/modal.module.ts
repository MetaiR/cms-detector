import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { CloseModalDirective } from './close-modal.directive';
import { OpenModalDirective } from './open-modal.directive';
import { ToggleModalDirective } from './toggle-modal.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ModalComponent,
        CloseModalDirective,
        OpenModalDirective,
        ToggleModalDirective
    ],
    exports: [
        ModalComponent,
        CloseModalDirective,
        OpenModalDirective,
        ToggleModalDirective
    ]
})
export class ModalModule { }
