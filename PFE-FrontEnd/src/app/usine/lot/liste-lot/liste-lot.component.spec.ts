import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeLotComponent } from './liste-lot.component';

describe('ListeLotComponent', () => {
  let component: ListeLotComponent;
  let fixture: ComponentFixture<ListeLotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeLotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
