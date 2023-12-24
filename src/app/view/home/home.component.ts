import { Component, OnInit, inject } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { ArticleCardGridComponent } from '../article/article-card-grid/article-card-grid.component';
import { Article } from '../../model/article.model';
import { ArticleService } from '../../service/article.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLinkWithHref, ArticleCardGridComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  articles: Article[] = [];

  articleService = inject(ArticleService);

  ngOnInit() {
    this.articleService.getArticles().subscribe((articles) => {
      this.articles = articles;
    });
  }
}
