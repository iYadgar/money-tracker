import { Component, OnInit } from '@angular/core';
import { AuthService, UserService } from '@money-tracker/common';

@Component({
  selector: 'money-tracker-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'money-tracker';
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.authService.init();
    this.userService.userStream$.subscribe();
  }
}
