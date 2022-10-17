import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { ChartDataSource, ChartViewConfig } from '@money-tracker/common';
import { ChartType } from 'ag-grid-community';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'money-tracker-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit {
  @Input() dataSource: ChartDataSource[];
  @Input() viewConfig: ChartViewConfig;
  view: [number, number];
  chartTypeToggleControl: FormControl;
  barPosition: 'vertical' | 'horizontal';

  constructor(private vcr: ViewContainerRef) {}

  ngOnInit(): void {
    this.chartTypeToggleControl = new FormControl<ChartType>(
      this.viewConfig.chartType
    );
    this.view = [
      this.vcr.element.nativeElement.offsetWidth,
      this.vcr.element.nativeElement.offsetHeight - 72,
    ];
    this.barPosition = this.getBarPosition();
  }

  getBarPosition(): 'vertical' | 'horizontal' {
    const isWide = this.view[0] > this.view[1];
    return isWide ? 'vertical' : 'horizontal';
  }
}
