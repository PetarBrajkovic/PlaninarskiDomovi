import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LodgeInfoPage } from './lodge-info.page';

const routes: Routes = [
  {
    path: '',
    component: LodgeInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LodgeInfoPageRoutingModule {}
