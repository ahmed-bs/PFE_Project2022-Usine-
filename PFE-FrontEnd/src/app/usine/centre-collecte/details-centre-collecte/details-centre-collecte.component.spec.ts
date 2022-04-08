import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCentreCollecteComponent } from './details-centre-collecte.component';

describe('DetailsCentreCollecteComponent', () => {
  let component: DetailsCentreCollecteComponent;
  let fixture: ComponentFixture<DetailsCentreCollecteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCentreCollecteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCentreCollecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
