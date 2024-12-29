import { Component, input } from '@angular/core';
import { WeatherForecastDayComponent } from "./weather-forecast-day/weather-forecast-day.component";
import { ForecastWeatherViewData } from '../../../../models/forecast-weather-view-data.interface';

@Component({
  selector: 'app-weather-card-forecast',
  standalone: true,
  imports: [WeatherForecastDayComponent],
  templateUrl: './weather-card-forecast.component.html',
  styleUrl: './weather-card-forecast.component.scss'
})
export class WeatherCardForecastComponent {
  weatherCardForecastDayForecast = input.required<ForecastWeatherViewData[]>();
}
