import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'money-tracker-expandable-search',
  templateUrl: './expandable-search.component.html',
  styleUrls: ['./expandable-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandableSearchComponent implements OnInit, OnDestroy {
  isSearchOn$ = new Subject<boolean>();
  search = new FormControl('');
  destroy$ = new Subject();
  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;
  @Output() searchChanged = new EventEmitter<string>();

  ngOnInit(): void {
    this.isSearchOn$.next(false);
    this.search.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe((value) => this.searchChanged.emit(value || ''));
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  toggleSearch(isSearchOn: boolean) {
    this.isSearchOn$.next(isSearchOn);
    if (isSearchOn) {
      this.searchInput.nativeElement.focus();
    } else {
      this.search.setValue('');
    }
  }

  handleFocusOut() {
    // this.toggleSearch(false);
  }
}
