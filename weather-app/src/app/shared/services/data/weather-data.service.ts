import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { ForecastWeatherViewData, transformOWDTForecastWeatherToViewData } from '../../../models/forecast-weather-view-data.interface';
import { WeatherLocation } from '../../../models/weather-location.interface';
import { WeatherDataStore } from '../../../models/weather-data-store.interface';
import { NinjaDTOCity } from '../../../models/api/ninja/ninja-dto-city.interface';
import { WeatherDataApiService } from '../api/weather-data-api.service';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  constructor(){
    effect(() => {
      const currentWeatherStore = this.weatherForecasteStore();
      localStorage.setItem('store', JSON.stringify(currentWeatherStore));
    })

    const localStorageString = localStorage.getItem('store');
    this.weatherForecasteStore.set(localStorageString ? JSON.parse(localStorageString) : {})

    if(Object.keys(this.weatherForecasteStore()).length > 0){
      const today = new Date();
      Object.entries(this.weatherForecasteStore()).forEach(([key, forecastData]) => {
        const firstDate = new Date(forecastData.weatherData[0].dt * 1000);
        if(firstDate.getDate() !== today.getDate() || firstDate.getMonth() !== today.getMonth()){
          this.loadOrRefreshForecastForLocation(key, forecastData.extendedForecast ? undefined : 1);
        }
      })
    }
  }

  private _weatherDataApiService = inject(WeatherDataApiService);

  weatherForecasteStore = signal<WeatherDataStore>({});

  savedWeatherForecastKeys = computed(() => {
    return Object.keys(this.weatherForecasteStore());
  })

  getForecastDataForLocation(locationName: string):  {location: WeatherLocation; weatherData: ForecastWeatherViewData[]} {
    return JSON.parse(JSON.stringify(this.weatherForecasteStore()[locationName]));
  }

  addForecastLocation(lat: number, lon: number, city: NinjaDTOCity){
    this._weatherDataApiService.getDailyForecast(lat, lon, 1).subscribe((forecast) => {
      this.weatherForecasteStore.update((currentStoreValue) => {
        return {
          ...currentStoreValue,
          [city.name]: {
            location: {
              name: city.name,
              country: city.country,
              lat: city.latitude,
              lon: city.longitude
            },
            extendedForecast: false,
            weatherData: forecast.list.map((forecast) => {
              return transformOWDTForecastWeatherToViewData(forecast);
            })
          }
        }
      })

    })
  }

  deleteWeatherCardForLocation(locationName: string){
    this.weatherForecasteStore.update((currentStoreValue) => {
      delete currentStoreValue[locationName];
      return {...currentStoreValue};
    })
  }

  loadOrRefreshForecastForLocation(locationName: string, forecastCount = 42){
    const { lat, lon } = this.weatherForecasteStore()[locationName].location;
    //4*5 => 30
    const today = new Date();
    this._weatherDataApiService.getDailyForecast(lat, lon, forecastCount).subscribe((forecast) => {
      this.weatherForecasteStore.update((currentStoreValue) => {
        return {
          ...currentStoreValue,
          [locationName]: {
            ...currentStoreValue[locationName],
            extendedForecast: true,
            weatherData: [transformOWDTForecastWeatherToViewData(forecast.list[0]), ...forecast.list.filter((singleForecast) => {
              const date = new Date(singleForecast.dt * 1000);
              return (today.getDate() !== date.getDate() && date.getHours() > 10 && date.getHours() < 14)
            }).map((forecastsToUse) => transformOWDTForecastWeatherToViewData(forecastsToUse))]
          }
        }
      })

    })
  }

}
