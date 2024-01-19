import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArticleButtonComponent } from './create-article-button.component';

describe('CreateArticleButtonComponent', () => {
  let component: CreateArticleButtonComponent;
  let fixture: ComponentFixture<CreateArticleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateArticleButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateArticleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
