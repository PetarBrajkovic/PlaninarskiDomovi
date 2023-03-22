import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyClubPageRoutingModule } from './my-club-routing.module';

import { MyClubPage } from './my-club.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    MyClubPageRoutingModule
  ],
  declarations: [MyClubPage]
})
export class MyClubPageModule { }
