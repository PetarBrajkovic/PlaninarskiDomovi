import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewClubPageRoutingModule } from './new-club-routing.module';

import { NewClubPage } from './new-club.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentsModule,
    NewClubPageRoutingModule
  ],
  declarations: [NewClubPage]
})
export class NewClubPageModule { }
