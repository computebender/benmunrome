import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageArticleDetailsComponent } from './manage-article-details.component';

describe('ManageArticleDetailsComponent', () => {
  let component: ManageArticleDetailsComponent;
  let fixture: ComponentFixture<ManageArticleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageArticleDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageArticleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
