import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VideopurcsuccPage } from './videopurcsucc.page';

const routes: Routes = [
  {
    path: '',
    component: VideopurcsuccPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VideopurcsuccPage]
})
export class VideopurcsuccPageModule {}
