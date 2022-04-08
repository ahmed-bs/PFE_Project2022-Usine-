import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreCollecteComponent } from './centre-collecte.component';

describe('CentreCollecteComponent', () => {
  let component: CentreCollecteComponent;
  let fixture: ComponentFixture<CentreCollecteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentreCollecteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentreCollecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
