import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapearComponent } from './mapear.component';

describe('MapearComponent', () => {
  let component: MapearComponent;
  let fixture: ComponentFixture<MapearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
