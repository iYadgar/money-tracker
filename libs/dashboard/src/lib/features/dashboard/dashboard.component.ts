import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'money-tracker-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
