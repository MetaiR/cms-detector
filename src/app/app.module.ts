import { ModalModule } from './share/modules/modal/modal.module';
import { AppRoutingModule } from './app-routing.module';
import { DbService } from './share/db.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DetectorComponent } from './detector/detector.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
   declarations: [
      AppComponent,
      DetectorComponent,
      SettingsComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      ModalModule
   ],
   providers: [
      DbService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {
}
