import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LodgeInfoPageRoutingModule } from './lodge-info-routing.module';

import { LodgeInfoPage } from './lodge-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    LodgeInfoPageRoutingModule
  ],
  declarations: [LodgeInfoPage]
})
export class LodgeInfoPageModule { }
