import { DetectorComponent } from './detector/detector.component';
import { SettingsComponent } from './settings/settings.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '', redirectTo: 'detect', pathMatch: 'full'
    },
    {
        path: 'detect', component: DetectorComponent
    },
    {
        path: 'settings', component: SettingsComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
