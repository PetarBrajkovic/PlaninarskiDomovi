import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditLodgePage } from './edit-lodge.page';

const routes: Routes = [
  {
    path: '',
    component: EditLodgePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditLodgePageRoutingModule {}
