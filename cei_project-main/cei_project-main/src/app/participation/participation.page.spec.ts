import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParticipationPage } from './participation.page';

describe('ParticipationPage', () => {
  let component: ParticipationPage;
  let fixture: ComponentFixture<ParticipationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
