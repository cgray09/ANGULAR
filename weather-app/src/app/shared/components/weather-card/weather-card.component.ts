import { Component, computed, inject, input, OnInit, output } from '@angular/core';
import { WeatherCardHeaderComponent } from "./weather-card-header/weather-card-header.component";
import { WeatherCardForecastComponent } from "./weather-card-forecast/weather-card-forecast.component";
import { WeatherDataService } from '../../services/data/weather-data.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [WeatherCardHeaderComponent, WeatherCardForecastComponent, MatIconModule],
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent {
  deleteWeatherCard = output<string>();
  loadWeekForecast = output<string>();
  weatherKey = input.required<string>();

  private _weatherDataService = inject(WeatherDataService)

  weatherData = computed(() => {
    return this._weatherDataService.getForecastDataForLocation(this.weatherKey());
  })

  weatherFutureForecast = computed(() => {
    return this.weatherData()?.weatherData?.slice(1) ?? [];
  }) 

  addFutureForecast(){
    this.loadWeekForecast.emit(this.weatherKey());
  }

  removeWeatherCard(){
    this.deleteWeatherCard.emit(this.weatherKey())
  }
}
