import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'money-tracker-vision',
  templateUrl: './vision.component.html',
  styleUrls: ['./vision.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
