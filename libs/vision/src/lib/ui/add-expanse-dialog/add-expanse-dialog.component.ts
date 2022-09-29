import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'money-tracker-add-expanse-dialog',
  templateUrl: './add-expanse-dialog.component.html',
  styleUrls: ['./add-expanse-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddExpanseDialogComponent {
  form: FormGroup = new FormGroup<any>({
    name: new FormControl('', [Validators.required]),
    value: new FormControl(0, [Validators.required, Validators.min(1)]),
  });
  constructor(private dialogRef: MatDialogRef<AddExpanseDialogComponent>) {}
  handleCancel() {
    this.dialogRef.close();
  }
  handleAdd() {
    const name = this.form.get('name')?.value || '';
    const value = +this.form.get('value')?.value || 0;
    this.dialogRef.close({ name, value });
  }
}
