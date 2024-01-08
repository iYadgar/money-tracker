import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '@money-tracker/common';
import { Router } from '@angular/router';

@Component({
  selector: 'money-tracker-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  async handleLogin() {
    const res = await this.authService.login();
    if (res) {
      this.router.navigate(['/']);
    }
  }
}
