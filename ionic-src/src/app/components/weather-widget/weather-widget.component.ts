import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
})
export class WeatherWidgetComponent implements OnInit {

  weatherData: any;
  constructor() { }

  ngOnInit() {
    this.weatherData = {
      main: {},
      isDay: true
    };
    this.getWeatherData();
    // console.log(this.weatherData);
  }

  getWeatherData() {
    // fetch('https://api.openweathermap.org/data/2.5/weather?q=niš&appid=ff1bc4683fc7325e9c57e586c20cc03e')
    //   .then(response => response.json())
    //   .then(data => { this.setWeatherData(data); })

    // let data = JSON.parse('{"coord":{"lon":72.85,"lat":19.01},"weather":[{"id":721,"main":"Haze","description":"haze","icon":"50n"}],"base":"stations","main":{"temp":297.15,"feels_like":297.4,"temp_min":297.15,"temp_max":297.15,"pressure":1013,"humidity":69},"visibility":3500,"wind":{"speed":3.6,"deg":300},"clouds":{"all":20},"dt":1580141589,"sys":{"type":1,"id":9052,"country":"IN","sunrise":1580089441,"sunset":1580129884},"timezone":19800,"id":1275339,"name":"Mumbai","cod":200}');
    // this.setWeatherData(data);
  }

  setWeatherData(data) {
    this.weatherData = data;
    const sunsetTime = new Date(this.weatherData.sys.sunset * 1000);
    this.weatherData.sunset_time = sunsetTime.toLocaleTimeString();
    const currentDate = new Date();
    this.weatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.weatherData.temp_celcius = (this.weatherData.main.temp - 273.15).toFixed(0);
    this.weatherData.temp_min = (this.weatherData.main.temp_min - 273.15).toFixed(0);
    this.weatherData.temp_max = (this.weatherData.main.temp_max - 273.15).toFixed(0);
    this.weatherData.temp_feels_like = (this.weatherData.main.feels_like - 273.15).toFixed(0);

    console.log(this.weatherData);

  }

}
