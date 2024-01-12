import { Component } from '@angular/core';
import { ImageCardComponent } from '../../component/image-card/image-card.component';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [ImageCardComponent],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {}
