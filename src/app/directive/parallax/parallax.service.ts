import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ParallaxService {
  private scrollPosition = 0;
  private isScrolling = false;
  private parallaxElements: ((scrollPosition: number) => void)[] = [];
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', this.onScroll.bind(this));
    }
  }

  registerParallaxElement(
    updateFunction: (scrollPosition: number) => void
  ): void {
    this.parallaxElements.push(updateFunction);
  }

  unregisterParallaxElement(
    updateFunction: (scrollPosition: number) => void
  ): void {
    this.parallaxElements = this.parallaxElements.filter(
      (func) => func !== updateFunction
    );
  }

  private onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.scrollPosition = window.scrollY;
    if (!this.isScrolling) {
      window.requestAnimationFrame(this.updateParallaxElements.bind(this));
      this.isScrolling = true;
    }
  }

  private updateParallaxElements(): void {
    this.parallaxElements.forEach((updateFunction) =>
      updateFunction(this.scrollPosition)
    );
    this.isScrolling = false;
  }
}
