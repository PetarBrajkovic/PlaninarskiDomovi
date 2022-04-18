import { MapComponent } from './map/map.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LodgeCardComponent } from './lodge-card/lodge-card.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    NavbarComponent,
    LodgeCardComponent,
    SpinnerComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    LodgeCardComponent,
    SpinnerComponent,
    MapComponent
  ]
})
export class ComponentsModule { }
