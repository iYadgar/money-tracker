import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/overlay';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}
  openDialog(component: ComponentType<any>, config?: MatDialogConfig) {
    return this.dialog.open(component, {
      width: '450px',
      height: '500px',
      ...config,
    });
  }
}
