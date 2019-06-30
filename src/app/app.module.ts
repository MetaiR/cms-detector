import { DbService } from './share/db.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DetectorComponentComponent } from './detector-component/detector-component.component';

@NgModule({
   declarations: [
      AppComponent,
      DetectorComponentComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      HttpClientModule
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
