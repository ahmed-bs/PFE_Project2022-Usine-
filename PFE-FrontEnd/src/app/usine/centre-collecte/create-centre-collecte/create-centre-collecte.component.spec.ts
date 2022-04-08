import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCentreCollecteComponent } from './create-centre-collecte.component';

describe('CreateCentreCollecteComponent', () => {
  let component: CreateCentreCollecteComponent;
  let fixture: ComponentFixture<CreateCentreCollecteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCentreCollecteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCentreCollecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
