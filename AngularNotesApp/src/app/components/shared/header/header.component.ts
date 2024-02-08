import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  hideNewNoteButton: boolean;

  constructor(private router: Router) {
    this.hideNewNoteButton =
      this.router.url.includes('edit') || this.router.url.includes('create');

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideNewNoteButton =
          this.router.url.includes('edit') ||
          this.router.url.includes('create');
      }
    });
  }
}
