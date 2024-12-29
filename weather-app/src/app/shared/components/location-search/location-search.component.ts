import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { WeatherDataApiService } from '../../services/api/weather-data-api.service';
import { NinjaDTOCity } from '../../../models/api/ninja/ninja-dto-city.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, filter, switchMap } from 'rxjs';
import { WeatherDataService } from '../../services/data/weather-data.service';

@Component({
  selector: 'app-location-search',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatAutocompleteModule, MatIconModule],
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent {
  weatherLocationControl = new FormControl();

  filteredLocationOptions: Signal<NinjaDTOCity[]>;
  private _openWeatherApiService = inject(WeatherDataApiService);
  private _weatherDataService = inject(WeatherDataService);

  selectedCity = signal<NinjaDTOCity | undefined>(undefined)

  constructor() { 
    this.filteredLocationOptions = toSignal(
      this.weatherLocationControl.valueChanges.pipe(debounceTime(1000),filter((newValue) => !!newValue), switchMap((newValue) => {
        return this._openWeatherApiService.getQueryCities(newValue);
      })), {initialValue: []})
  }

  setSelectedCity(city: NinjaDTOCity){
    this.selectedCity.set(city);
  }

  addCityToWeatherForecast(mouseEvent: MouseEvent){
    mouseEvent.stopPropagation();
    const selectedCity = this.selectedCity();
    if(!selectedCity) return;
    this._weatherDataService.addForecastLocation(selectedCity.latitude, selectedCity.longitude, selectedCity);
  }

}
