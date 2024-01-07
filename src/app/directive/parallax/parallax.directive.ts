import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ParallaxService } from './parallax.service';
import { inject } from '@angular/core';

@Directive({
  selector: '[appParallax]',
  standalone: true,
})
export class ParallaxDirective implements OnInit, OnDestroy {
  @Input('ratio') parallaxRatio: number = 1;

  private eleRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private parallaxService = inject(ParallaxService);
  private updateFunction: (scrollPosition: number) => void;

  constructor() {
    this.updateFunction = (scrollPosition) => {
      const offset = scrollPosition * this.parallaxRatio;
      this.renderer.setStyle(
        this.eleRef.nativeElement,
        'transform',
        `translateY(${offset}px)`,
      );
    };
  }

  ngOnInit(): void {
    this.parallaxService.registerParallaxElement(this.updateFunction);
  }

  ngOnDestroy(): void {
    this.parallaxService.unregisterParallaxElement(this.updateFunction);
  }
}
