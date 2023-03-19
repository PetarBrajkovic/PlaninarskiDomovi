import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditLodgePageRoutingModule } from './edit-lodge-routing.module';
import { EditLodgePage } from './edit-lodge.page';
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
    EditLodgePageRoutingModule
  ],
  declarations: [EditLodgePage]
})
export class EditLodgePageModule { }
