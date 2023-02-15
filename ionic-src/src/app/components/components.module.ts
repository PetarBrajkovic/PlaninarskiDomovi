import { MapComponent } from './map/map.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LodgeCardComponent } from './lodge-card/lodge-card.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherWidgetComponent } from './weather-widget/weather-widget.component';
import { AvailabilityModalComponent } from './availability-modal/availability-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarComponent,
    LodgeCardComponent,
    SpinnerComponent,
    WeatherWidgetComponent,
    MapComponent,
    AvailabilityModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    LodgeCardComponent,
    SpinnerComponent,
    WeatherWidgetComponent,
    MapComponent,
    AvailabilityModalComponent
  ],
  providers: [
    AvailabilityModalComponent
  ]
})
export class ComponentsModule { }
