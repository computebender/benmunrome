import { Component, Input } from '@angular/core';
import { NavbarItem } from '../../config/navbar-items';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  @Input()
  navbarItems: NavbarItem[] = [];
}
