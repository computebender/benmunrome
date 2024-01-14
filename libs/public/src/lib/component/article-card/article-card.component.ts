import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { Article, ArticleWithTags } from '../../model/article.model';
import { Observable, Subject, combineLatest, filter, map, timer } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TagPillComponent } from '../tag-pill/tag-pill.component';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, TagPillComponent],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss',
})
export class ArticleCardComponent {
  @Input({ required: true }) article!: ArticleWithTags;

  private router = inject(Router);

  imageLoaded = false;

  onCardClick() {
    this.router.navigate(['/blog', this.article.id, this.article.slug]);
  }

  onImageLoad() {
    this.imageLoaded = true;
  }
}
