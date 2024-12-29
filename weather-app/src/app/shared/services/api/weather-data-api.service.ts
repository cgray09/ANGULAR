import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { OWDTOForecastResponse } from '../../../models/api/open-weather/ow-dto-forecast-response.interface';
import { ninjaApiToken, openWeatherApi } from '../../../api-keys';
import { NinjaDTOCity } from '../../../models/api/ninja/ninja-dto-city.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataApiService {
  private _httpClient = inject(HttpClient)

  constructor() { }

  getDailyForecast(lat: number, lon: number, timeStampCount: number){
    return this._httpClient.get<OWDTOForecastResponse>(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${timeStampCount}&appid=${openWeatherApi}`)
  }

  getQueryCities(searchString: string){
    return this._httpClient.get<NinjaDTOCity[]>(`https://api.api-ninjas.com/v1/city?name=${searchString}&limit=10`, {
      headers: {
        'X-Api-Key': ninjaApiToken
      }
    })
  }

}
