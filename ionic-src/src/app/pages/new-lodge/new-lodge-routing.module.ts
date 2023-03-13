import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewLodgePage } from './new-lodge.page';

const routes: Routes = [
  {
    path: '',
    component: NewLodgePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewLodgePageRoutingModule {}
