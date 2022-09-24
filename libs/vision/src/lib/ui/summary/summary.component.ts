import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SettingsService } from '@money-tracker/common';

@Component({
  selector: 'money-tracker-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent {
  @Input() title: string;
  @Input() value: number;
  constructor(public settingsService: SettingsService) {}
}
