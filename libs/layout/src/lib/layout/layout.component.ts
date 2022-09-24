import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_ROUTES } from '@money-tracker/common';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'money-tracker-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  activeRoute$: Observable<APP_ROUTES>;
  constructor(private layoutService: LayoutService) {}
  ngOnInit(): void {
    this.activeRoute$ = this.layoutService.getCurrentRoute();
  }
}
