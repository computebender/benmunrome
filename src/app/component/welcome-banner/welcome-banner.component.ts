import { Component } from '@angular/core';
import { ParallaxDirective } from '../../directive/parallax/parallax.directive';

@Component({
  selector: 'app-welcome-banner',
  standalone: true,
  imports: [ParallaxDirective],
  templateUrl: './welcome-banner.component.html',
  styleUrl: './welcome-banner.component.scss',
})
export class WelcomeBannerComponent {
  lookingForWork = true;
}
