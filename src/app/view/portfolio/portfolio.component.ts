import { Component } from '@angular/core';
import { ImageCardComponent } from '../../component/image-card/image-card.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [ImageCardComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {}
