import { Component, OnInit, inject } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { Store } from '@ngrx/store';
import { BlogActions } from '../../../blog/store/blog.actions';
import { selectAllUIArticles } from '../../../blog/store/selectors/blog.selectors';
import { ArticleCardGridComponent } from '../../component/article-card-grid/article-card-grid.component';
import { WelcomeBannerComponent } from '../../component/welcome-banner/welcome-banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLinkWithHref,
    ArticleCardGridComponent,
    WelcomeBannerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly store = inject(Store);
  articles = this.store.selectSignal(selectAllUIArticles);

  ngOnInit() {
    this.store.dispatch(BlogActions.loadArticles());
  }
}
