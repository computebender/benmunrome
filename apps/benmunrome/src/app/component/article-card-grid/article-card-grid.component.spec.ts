import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCardGridComponent } from './article-card-grid.component';

describe('ArticleCardGridComponent', () => {
  let component: ArticleCardGridComponent;
  let fixture: ComponentFixture<ArticleCardGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleCardGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleCardGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
