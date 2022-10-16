import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Asset,
  AssetGroup,
  AssetGroupWorth,
  ASSETS_TABLE_VIEW_CONFIG,
} from '@money-tracker/common';
import { AssetsService } from '../../services/assets.service';
import { BehaviorSubject, map, Observable, switchMap, take, tap } from 'rxjs';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'money-tracker-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetsComponent implements OnInit {
  viewConfig = ASSETS_TABLE_VIEW_CONFIG;
  assetsGroups$: Observable<AssetGroup[]>;
  currentSelectedGroup$: Observable<AssetGroup | null>;
  currentTabIndex$ = new BehaviorSubject(0);
  currentGroupNetWorth$: Observable<AssetGroupWorth>;
  @ViewChild('tabGroup') tabGroup: MatTabGroup;

  constructor(private assetsService: AssetsService) {}

  ngOnInit(): void {
    this.assetsGroups$ = this.assetsService.assetsGroups$;
    this.currentSelectedGroup$ = this.currentTabIndex$.asObservable().pipe(
      switchMap((i) => {
        return this.assetsGroups$.pipe(map((assets) => assets[i] || null));
      })
    );
    this.currentGroupNetWorth$ = this.currentSelectedGroup$.pipe(
      map((group) => {
        if (group) {
          return this.assetsService.getAssetNetWorth(group);
        }
        return { withPension: 0, withoutPension: 0 };
      })
    );
  }

  onEdit(event: Partial<Asset>) {
    this.currentSelectedGroup$
      .pipe(
        tap((group) => {
          if (group) {
            this.assetsService.editAsset(group, event);
          }
        }),
        take(1)
      )
      .subscribe();
  }

  addGroup() {
    const currentIndex = this.currentTabIndex$.value;
    this.assetsService
      .createAssetGroup()
      .pipe(take(1))
      .subscribe(async (responsePromise) => {
        const res = await responsePromise;
        if (res) {
          this.tabGroup.selectedIndex = currentIndex - 1;
        }
      });
  }

  handleTabChange(event: MatTabChangeEvent) {
    this.currentTabIndex$.next(event.index);
  }
  trackAssets(index: number, assetGroup: AssetGroup) {
    return assetGroup.id;
  }
  handleDelete() {
    this.currentSelectedGroup$.pipe(take(1)).subscribe((group) => {
      this.assetsService.deleteGroup(group?.id || '');
    });
  }
}
