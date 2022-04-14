import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOperationTransformationComponent } from './create-operation-transformation.component';

describe('CreateOperationTransformationComponent', () => {
  let component: CreateOperationTransformationComponent;
  let fixture: ComponentFixture<CreateOperationTransformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOperationTransformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOperationTransformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
