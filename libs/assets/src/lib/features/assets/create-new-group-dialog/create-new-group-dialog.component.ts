import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'money-tracker-create-new-group-dialog',
  templateUrl: './create-new-group-dialog.component.html',
  styleUrls: ['./create-new-group-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNewGroupDialogComponent {
  selectedDate: string;
  constructor(private dialogRef: MatDialogRef<CreateNewGroupDialogComponent>) {}

  handleCancel() {
    this.dialogRef.close(null);
  }

  handleSubmit() {
    this.dialogRef.close(this.selectedDate);
  }
}
