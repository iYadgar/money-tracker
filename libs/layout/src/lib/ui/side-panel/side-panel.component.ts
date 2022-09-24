import { Component, OnInit } from '@angular/core';
import { APP_ROUTES, APP_ROUTES_CONFIG } from '@money-tracker/common';
import { Observable } from 'rxjs';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'money-tracker-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
})
export class SidePanelComponent implements OnInit {
  logo = './logo-no-background.svg';
  routes = APP_ROUTES_CONFIG;
  activeRoute$: Observable<APP_ROUTES>;

  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {
    this.activeRoute$ = this.layoutService.getCurrentRoute();
  }
}
