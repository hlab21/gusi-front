import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComfetComponent } from './comfet.component';

describe('ComfetComponent', () => {
  let component: ComfetComponent;
  let fixture: ComponentFixture<ComfetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComfetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComfetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
