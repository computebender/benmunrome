import { Component } from '@angular/core';
import { navbarItems } from './config/navbar-items';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss',
})
export class PublicComponent {
  navbarItems = navbarItems;
}
