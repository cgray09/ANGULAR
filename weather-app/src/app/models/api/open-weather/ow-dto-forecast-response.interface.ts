import { OWDTOForecastWeatherData } from './ow-dto-forecast-weather-data.interface';

export interface OWDTOForecastResponse {
  city: {
    id: number;
    name: string;
    coord: {
      lon: number;
      lat: number;
    };
    country: string;
    population: number;
    timezone: number;
  };
  cod: number;
  message: number;
  cnt: number;
  list: OWDTOForecastWeatherData[];
}
