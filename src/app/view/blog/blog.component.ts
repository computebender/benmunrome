import { Component, inject } from '@angular/core';
import { BlogStore } from '../../store/blog.store';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  readonly blogStore = inject(BlogStore);
}
