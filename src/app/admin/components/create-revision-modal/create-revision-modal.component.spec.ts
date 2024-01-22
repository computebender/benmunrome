import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRevisionModalComponent } from './create-revision-modal.component';

describe('CreateRevisionModalComponent', () => {
  let component: CreateRevisionModalComponent;
  let fixture: ComponentFixture<CreateRevisionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateRevisionModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRevisionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
