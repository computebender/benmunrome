import { Component, OnInit, inject } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { ArticleCardGridComponent } from '../../component/article-card-grid/article-card-grid.component';
import { Article } from '../../model/article.model';
import { ArticleService } from '../../service/article.service';
import { WelcomeBannerComponent } from '../../component/welcome-banner/welcome-banner.component';
import { BlogStore } from '../../store/blog.store';

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
  readonly blogStore = inject(BlogStore);

  ngOnInit() {
    this.blogStore.loadFeatuedArticleIds();
  }
}
