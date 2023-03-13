import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewLodgePageRoutingModule } from './new-lodge-routing.module';

import { NewLodgePage } from './new-lodge.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { UploaderModule } from 'angular-uploader';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule,
    UploaderModule,
    NewLodgePageRoutingModule
  ],
  declarations: [NewLodgePage]
})
export class NewLodgePageModule { }
