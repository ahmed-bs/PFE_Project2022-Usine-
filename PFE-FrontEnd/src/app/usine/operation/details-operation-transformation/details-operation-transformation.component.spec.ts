import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOperationTransformationComponent } from './details-operation-transformation.component';

describe('DetailsOperationTransformationComponent', () => {
  let component: DetailsOperationTransformationComponent;
  let fixture: ComponentFixture<DetailsOperationTransformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsOperationTransformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOperationTransformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
