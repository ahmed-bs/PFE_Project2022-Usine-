import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCentreCollecteComponent } from './liste-centre-collecte.component';

describe('ListeCentreCollecteComponent', () => {
  let component: ListeCentreCollecteComponent;
  let fixture: ComponentFixture<ListeCentreCollecteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCentreCollecteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCentreCollecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
