import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultatsPage } from './resultats.page';

describe('ResultatsPage', () => {
  let component: ResultatsPage;
  let fixture: ComponentFixture<ResultatsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
