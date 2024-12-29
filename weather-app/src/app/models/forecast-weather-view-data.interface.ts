import { OWDTOForecastWeatherData } from "./api/open-weather/ow-dto-forecast-weather-data.interface";

export interface ForecastWeatherViewData{
    dt: number;
    temp: number;
    humidity: number;
    weather: {
        main: string,
        description: string,
        icon: string,
    },
    windSpeed: number
}

export function transformOWDTForecastWeatherToViewData(forecasteWeatherData: OWDTOForecastWeatherData){
    return {
        dt: forecasteWeatherData.dt,
        temp: forecasteWeatherData.main.temp,
        humidity: forecasteWeatherData.main.humidity,
        weather: {
            main: forecasteWeatherData.weather[0].main,
            description: forecasteWeatherData.weather[0].description,
            icon: forecasteWeatherData.weather[0].icon,
        },
        windSpeed: forecasteWeatherData.wind.speed,
    }
}