import { Component, inject, OnInit } from '@angular/core';
import { MainHeaderComponent } from '../../shared/components/main-header/main-header.component';
import { LocationSearchComponent } from '../../shared/components/location-search/location-search.component';
import { WeatherCardComponent } from "../../shared/components/weather-card/weather-card.component";
import { WeatherDataService } from '../../shared/services/data/weather-data.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MainHeaderComponent, LocationSearchComponent, WeatherCardComponent],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  private _weatherDataService = inject(WeatherDataService)

  forecastWeatherLocations = this._weatherDataService.savedWeatherForecastKeys;

  deleteWeatherCard(key: string){
    this._weatherDataService.deleteWeatherCardForLocation(key);
  }

  loadForecastForLocation(locationKey: string){
    this._weatherDataService.loadOrRefreshForecastForLocation(locationKey);
  }
}
