import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsLotComponent } from './details-lot.component';

describe('DetailsLotComponent', () => {
  let component: DetailsLotComponent;
  let fixture: ComponentFixture<DetailsLotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsLotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
