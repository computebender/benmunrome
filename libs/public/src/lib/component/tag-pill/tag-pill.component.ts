import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tag } from '../../model/tag.model';
import { tagColourToTailwindClass } from '../../util/tag-colour-to-tailwind-class.util';
import { CommonModule } from '@angular/common';

export const PILL_VARIANT = {
  SMALL: 'small',
  LARGE: 'large',
} as const;

export type PillVariantType = (typeof PILL_VARIANT)[keyof typeof PILL_VARIANT];

@Component({
  selector: 'app-tag-pill',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tag-pill.component.html',
  styleUrl: './tag-pill.component.scss',
})
export class TagPillComponent {
  @Input({ required: true })
  set tag(tag: Tag) {
    this._tag = tag;
    this.updateStyles();
  }

  @Input()
  interactable = false;

  @Input()
  closable = false;

  @Input()
  variant: PillVariantType = PILL_VARIANT.SMALL;

  @Output() interact = new EventEmitter<Tag>();

  _tag!: Tag;

  backgroundColour = '';

  textColour = '';

  updateStyles() {
    const tailwindClass = tagColourToTailwindClass(this._tag.colour);
    this.backgroundColour = tailwindClass.background;
    this.textColour = tailwindClass.text;
  }

  handleClick() {
    if (this.interactable) {
      this.interact.emit(this._tag);
    }
  }
}
