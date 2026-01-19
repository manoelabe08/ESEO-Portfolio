import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservationCentrePage } from './observation-centre.page';

describe('ObservationCentrePage', () => {
  let component: ObservationCentrePage;
  let fixture: ComponentFixture<ObservationCentrePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationCentrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
