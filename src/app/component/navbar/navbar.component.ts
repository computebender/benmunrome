import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NavbarItem } from '../../navbar-items';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLinkWithHref,
    RouterLinkActive,
    FontAwesomeModule,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  @Input()
  navbarItems: NavbarItem[] = [];

  faBars = faBars;
  faTimes = faTimes;
  mobileNavOpen = false;
  breakpointObserver = inject(BreakpointObserver);

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 768px)'])
      .subscribe((result) => {
        if (result.matches) {
          console.log('breaking');
          this.mobileNavOpen = false;
        }
      });
  }

  toggleMobileNav() {
    this.mobileNavOpen = !this.mobileNavOpen;
  }

  hideMobileNav() {
    this.mobileNavOpen = false;
  }
}
