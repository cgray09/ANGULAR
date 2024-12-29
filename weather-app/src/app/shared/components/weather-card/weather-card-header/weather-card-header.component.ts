import { Component, computed, input, OnInit, output } from '@angular/core';
import { ForecastWeatherViewData } from '../../../../models/forecast-weather-view-data.interface';
import { WeatherLocation } from '../../../../models/weather-location.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-weather-card-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './weather-card-header.component.html',
  styleUrls: ['./weather-card-header.component.scss']
})
export class WeatherCardHeaderComponent {
  deleteWeatherCard = output<void>();
  weatherToday = input.required<ForecastWeatherViewData>();
  location = input.required<WeatherLocation>();

  viewWeatherData = computed(() => {
    const weatherForecast = this.weatherToday();
    return {
      temperature: `${Math.round((weatherForecast.temp - 273) * 100) / 100} °`,
      weatherType: weatherForecast.weather.description,
      humidity: weatherForecast.humidity + "%",
      wind: weatherForecast.windSpeed + " m/sec"
    }
  })

  weatherIcon = computed(() => {
    return `http://openweathermap.org/img/wn/${
      this.weatherToday().weather.icon
    }@2x.png`;
  })

  deleteWeatherCardClicked(){
    this.deleteWeatherCard.emit();
  }
}
