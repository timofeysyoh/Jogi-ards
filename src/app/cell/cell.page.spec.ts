import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CellPage } from './cell.page';

describe('CellPage', () => {
  let component: CellPage;
  let fixture: ComponentFixture<CellPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CellPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
