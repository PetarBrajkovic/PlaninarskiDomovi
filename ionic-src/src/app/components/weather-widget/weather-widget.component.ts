import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
})
export class WeatherWidgetComponent {

  private _coordinates;

  @Input()
  public get coordinates(): number[] {
    return this._coordinates;
  }

  public set coordinates(val: number[]) {
    this._coordinates = val;
    if (val && val.length > 0) {
      this.getWeatherData();
    }
  }
  weatherData: any;
  iconUrl = 'https://openweathermap.org/img/wn/{icon}@2x.png';

  getWeatherData() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.coordinates[1]}&lon=${this.coordinates[0]}&appid=ff1bc4683fc7325e9c57e586c20cc03e`)
      .then(response => response.json())
      .then(data => { this.setWeatherData(data); })
  }

  setWeatherData(data) {
    this.addScript(data.name);

  }

  addScript(cityName) {
    const oldScript = document.querySelector('#weatherWidgetMoj');
    if (oldScript) {
      document.body.removeChild(oldScript);
    }
    const script = document.createElement('script');
    script.innerHTML = 'window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];' +
      'window.myWidgetParam.push({ id: 8, city_name: \'' + cityName + `', appid: 'ff1bc4683fc7325e9c57e586c20cc03e', lang: 'sr', units: 'metric', containerid: 'openweathermap-widget-8', });
    (function () {
      var script = document.createElement('script');
      script.async = true;
      script.charset = "utf-8";
      script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script, s);
    })();`;
    script.id = 'weatherWidgetMoj'
    document.body.appendChild(script);
  }

}
