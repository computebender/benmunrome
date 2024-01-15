import { Component, inject } from '@angular/core';
import { BlogStore } from '../../store/blog.store';
import { ArticleCardGridComponent } from '../../component/article-card-grid/article-card-grid.component';
import {
  PILL_VARIANT,
  TagPillComponent,
} from '../../component/tag-pill/tag-pill.component';
import { Tag } from '../../model/tag.model';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [ArticleCardGridComponent, TagPillComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  PILL_VARIANT = PILL_VARIANT;
  readonly blogStore = inject(BlogStore);

  handleTagSetActive(tag: Tag) {
    this.blogStore.addActiveTagId(tag.id);
  }

  handleTagSetInactive(tag: Tag) {
    this.blogStore.removeActiveTagId(tag.id);
  }
}
