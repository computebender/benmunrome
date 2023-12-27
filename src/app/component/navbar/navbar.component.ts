import { Component } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { navbarLinks } from './navbar-items';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLinkWithHref, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  navbarLinks = navbarLinks;
}
