import { Injectable } from '@angular/core';
import { map, startWith } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';
import { APP_ROUTES } from '@money-tracker/common';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor(private router: Router) {}

  getCurrentRoute() {
    return this.router.events.pipe(
      startWith(null),
      map((event) => {
        if (event instanceof NavigationStart) {
          return event.url.substring(1, event.url.length) as APP_ROUTES;
        }
        const location = window.location.pathname;
        return location.substring(1, location.length) as APP_ROUTES;
      })
    );
  }
}
