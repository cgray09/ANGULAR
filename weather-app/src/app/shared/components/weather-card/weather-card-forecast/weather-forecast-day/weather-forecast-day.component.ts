import { Component, computed, input, signal } from '@angular/core';
import { ForecastWeatherViewData } from '../../../../../models/forecast-weather-view-data.interface';

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

@Component({
  selector: 'app-weather-forecast-day',
  standalone: true,
  imports: [],
  templateUrl: './weather-forecast-day.component.html',
  styleUrl: './weather-forecast-day.component.scss'
})
export class WeatherForecastDayComponent {
  weatherForecast = input.required<ForecastWeatherViewData>();

  dayName = computed(() => {
    const date = new Date(this.weatherForecast().dt * 1000);
    return days[date.getDay()];
  })

  weatherIcon = computed(() => {
    return `http://openweathermap.org/img/wn/${
      this.weatherForecast().weather.icon
    }@2x.png`;
  })

  temperature = computed(() => {
    // temp = 283.23123 - 273 -> 10.23123 * 100 -> 1023.123 -> 1023 / 100 -> 10.23 
    return `${Math.round((this.weatherForecast().temp - 273) * 100) / 100} °`;
  });
}
