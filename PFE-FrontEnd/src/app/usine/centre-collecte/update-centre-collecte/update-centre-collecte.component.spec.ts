import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCentreCollecteComponent } from './update-centre-collecte.component';

describe('UpdateCentreCollecteComponent', () => {
  let component: UpdateCentreCollecteComponent;
  let fixture: ComponentFixture<UpdateCentreCollecteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCentreCollecteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCentreCollecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
