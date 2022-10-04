import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ILoadingCellRendererAngularComp } from 'ag-grid-angular';
import { ILoadingCellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'money-tracker-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteButtonComponent implements ILoadingCellRendererAngularComp {
  agInit(params: ILoadingCellRendererParams): void {}
}
