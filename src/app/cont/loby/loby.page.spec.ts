import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LobyPage } from './loby.page';

describe('LobyPage', () => {
  let component: LobyPage;
  let fixture: ComponentFixture<LobyPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(LobyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
