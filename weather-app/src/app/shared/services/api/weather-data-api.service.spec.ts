/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WeatherDataApiService } from './weather-data-api.service';

describe('Service: WeatherDataApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherDataApiService]
    });
  });

  it('should ...', inject([WeatherDataApiService], (service: WeatherDataApiService) => {
    expect(service).toBeTruthy();
  }));
});
