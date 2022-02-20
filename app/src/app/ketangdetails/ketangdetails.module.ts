import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { KetangdetailsPage } from './ketangdetails.page';

const routes: Routes = [
  {
    path: '',
    component: KetangdetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [KetangdetailsPage]
})
export class KetangdetailsPageModule {}
