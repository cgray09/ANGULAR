import { ForecastWeatherViewData } from "./forecast-weather-view-data.interface";
import { WeatherLocation } from "./weather-location.interface";

export interface WeatherDataStore {
  [locationKey: string]: {
    location: WeatherLocation;
    extendedForecast: boolean;
    weatherData: ForecastWeatherViewData[];
  };
}
