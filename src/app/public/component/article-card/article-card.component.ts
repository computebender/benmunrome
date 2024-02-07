import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { Tag } from '../../../blog/model/tag.model';
import { TagPillComponent } from '../tag-pill/tag-pill.component';

const DEFAULT_COVER_IMAGE = 'https://picsum.photos/300/200';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, TagPillComponent],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss',
})
export class ArticleCardComponent {
  @Input() coverImageUrl?: string = DEFAULT_COVER_IMAGE;
  @Input() title: string = '';
  @Input() summary: string = '';
  @Input() articleId?: string;
  @Input() slug?: string;
  @Input() tags: Tag[] = [];



  private router = inject(Router);

  imageLoaded = false;

  onCardClick() {
    if (this.articleId == undefined || this.slug == undefined) {
      return;
    }
    this.router.navigate(['/blog', this.articleId, this.slug]);
  }

  onImageLoad() {
    this.imageLoaded = true;
  }
}
