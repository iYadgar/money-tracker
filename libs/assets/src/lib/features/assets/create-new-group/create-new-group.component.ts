import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'money-tracker-create-new-group',
  templateUrl: './create-new-group.component.html',
  styleUrls: ['./create-new-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNewGroupComponent {
  @Output() clickedAddNewGroup = new EventEmitter<void>();
  onAddNewGroup() {
    this.clickedAddNewGroup.emit();
  }
}
