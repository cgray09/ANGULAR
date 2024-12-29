import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCardForecastComponent } from './weather-card-forecast.component';

describe('WeatherCardForecastComponent', () => {
  let component: WeatherCardForecastComponent;
  let fixture: ComponentFixture<WeatherCardForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherCardForecastComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherCardForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
