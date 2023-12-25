import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appParallax]',
  standalone: true,
})
export class ParallaxDirective {
  @Input('ratio') parallaxRatio: number = 1;

  private eleRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const offset = window.scrollY;
    this.renderer.setStyle(
      this.eleRef.nativeElement,
      'transform',
      `translateY(${offset * this.parallaxRatio}px)`
    );
  }
}
