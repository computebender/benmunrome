import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRevisionButtonComponent } from './create-revision-button.component';

describe('CreateRevisionButtonComponent', () => {
  let component: CreateRevisionButtonComponent;
  let fixture: ComponentFixture<CreateRevisionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateRevisionButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRevisionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
