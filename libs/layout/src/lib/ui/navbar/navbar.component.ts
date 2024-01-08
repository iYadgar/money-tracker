import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_ROUTES, AuthService, UserService } from '@money-tracker/common';
import { LayoutService } from '@money-tracker/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'money-tracker-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  activeRoute$: Observable<APP_ROUTES>;
  constructor(
    private layoutService: LayoutService,
    public userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activeRoute$ = this.layoutService.getCurrentRoute();
  }

  async handleLogout() {
    const res = await this.authService.logout();
    if (res) {
      this.router.navigate([`/${APP_ROUTES.LOGIN}`]);
    }
  }
}
