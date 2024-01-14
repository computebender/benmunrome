import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-image-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.scss',
})
export class ImageCardComponent implements OnInit {
  @Input({ required: true })
  imageUrl!: string;

  @Input()
  largeImageUrl?: string;

  @Input()
  caption?: string;

  @Input()
  enableDialog: boolean = false;

  @ViewChild('largeImageDialog')
  largeImageDialog!: ElementRef<HTMLDialogElement>;

  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {}

  showLargeImage(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.largeImageDialog.nativeElement.showModal();
    }
  }

  hideLargeImage(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.largeImageDialog.nativeElement.close();
    }
  }

  handleImageClick(): void {
    if (this.enableDialog) {
      this.showLargeImage();
    }
  }

  handleBackdropClick(event: MouseEvent): void {
    if (event.target === this.largeImageDialog.nativeElement) {
      this.hideLargeImage();
    }
  }

  handleCloseDialog(event: MouseEvent) {
    this.hideLargeImage();
  }
}
