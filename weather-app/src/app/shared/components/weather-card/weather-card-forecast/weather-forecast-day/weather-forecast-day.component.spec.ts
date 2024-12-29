import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherForecastDayComponent } from './weather-forecast-day.component';

describe('WeatherForecastDayComponent', () => {
  let component: WeatherForecastDayComponent;
  let fixture: ComponentFixture<WeatherForecastDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherForecastDayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherForecastDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
