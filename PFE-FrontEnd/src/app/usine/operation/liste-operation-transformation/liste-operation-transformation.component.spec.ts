import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeOperationTransformationComponent } from './liste-operation-transformation.component';

describe('ListeOperationTransformationComponent', () => {
  let component: ListeOperationTransformationComponent;
  let fixture: ComponentFixture<ListeOperationTransformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeOperationTransformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeOperationTransformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
