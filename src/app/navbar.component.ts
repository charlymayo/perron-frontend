import {Component} from '@angular/core';

@Component({
  selector: 'navbar', 
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  // Step 1:
  // Create a property to track whether the menu is open.
  // Start with the menu collapsed so that it does not
  // appear initially when the page loads on a small screen!
  public isMenuCollapsed = true;
}