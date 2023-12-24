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
    const offset = window.pageYOffset;
    const newTransformY = `translateY(${offset * this.parallaxRatio}px)`;

    // Extract existing transform values
    const transform = this.eleRef.nativeElement.style.transform;
    console.log(`Existing transform: ${transform}`); // Debugging log

    const transformValues = this.parseTransform(transform);

    // Update only the translateY value, preserve others
    transformValues.translateY = newTransformY;

    // Reconstruct the transform string
    const updatedTransform = this.constructTransformString(transformValues);
    console.log(`Updated transform: ${updatedTransform}`); // Debugging log

    this.renderer.setStyle(
      this.eleRef.nativeElement,
      'transform',
      updatedTransform
    );
  }

  private parseTransform(transform: string): any {
    const transformValues = {
      translateX: '',
      translateY: '',
      // Add other transformations if needed
    };

    const matchTranslateX = transform.match(/translateX\(([^)]+)\)/);
    const matchTranslateY = transform.match(/translateY\(([^)]+)\)/);

    if (matchTranslateX)
      transformValues.translateX = `translateX(${matchTranslateX[1]})`;
    if (matchTranslateY)
      transformValues.translateY = `translateY(${matchTranslateY[1]})`;

    return transformValues;
  }

  private constructTransformString(transformValues: any): string {
    return `${transformValues.translateX} ${transformValues.translateY}`.trim();
  }
}
