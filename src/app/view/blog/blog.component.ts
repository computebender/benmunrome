import { Component, inject } from '@angular/core';
import { BlogStore } from '../../store/blog.store';
import { ArticleCardGridComponent } from '../../component/article-card-grid/article-card-grid.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [ArticleCardGridComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  readonly blogStore = inject(BlogStore);
}
