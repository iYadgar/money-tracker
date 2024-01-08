import { Injectable } from '@angular/core';
import {
  Asset,
  AssetGroup,
  AssetGroupWorth,
  COLLECTIONS,
  DialogService,
  FirestoreService,
} from '@money-tracker/common';
import { distinctUntilChanged, map, Observable, switchMap } from 'rxjs';
import { CreateNewGroupDialogComponent } from '../features/assets/create-new-group-dialog/create-new-group-dialog.component';
import { cloneDeep } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  get assetsGroups$(): Observable<AssetGroup[]> {
    return this.firestoreService
      .getCollection<AssetGroup>(COLLECTIONS.ASSETS)
      .pipe(
        map(this.sortGroupsByDate),
        map(this.setIsPensionToDisplayValue),
        distinctUntilChanged()
      );
  }

  constructor(
    private firestoreService: FirestoreService,
    private dialogService: DialogService
  ) {}

  createAssetGroup(): Observable<Promise<boolean>> {
    return this.dialogService
      .openDialog(CreateNewGroupDialogComponent)
      .afterClosed()
      .pipe(
        switchMap((selectedDate) => {
          return this.assetsGroups$.pipe(
            map(async (groups) => {
              if (selectedDate) {
                const template = {
                  createdAt: new Date(selectedDate).toISOString(),
                  assets: groups.length
                    ? groups[groups.length - 1].assets.map(
                        (asset): Asset => ({
                          isPension: asset.isPension || false,
                          type: asset.type || '',
                          link: asset.link || '',
                          establishment: asset.establishment || '',
                          amount: 0,
                          id: this.firestoreService.generateId(),
                        })
                      )
                    : [],
                };
                this.firestoreService.createDocument<AssetGroup>(
                  COLLECTIONS.ASSETS,
                  template
                );
                return true;
              }
              return false;
            })
          );
        })
      );
  }

  updateAsset(group: AssetGroup, values: Partial<Asset>) {
    const updatedGroup = JSON.parse(JSON.stringify(group));
    updatedGroup.assets = updatedGroup.assets.map((asset: Asset) => {
      if (values.id === asset.id) {
        return { ...asset, ...values };
      }
      return asset;
    });
    this.firestoreService.updateDocument<AssetGroup>(
      COLLECTIONS.ASSETS,
      group.id,
      updatedGroup
    );
  }
  createNewAsset(group: AssetGroup, values: Partial<Asset>) {
    this.firestoreService.updateDocument<AssetGroup>(
      COLLECTIONS.ASSETS,
      group.id,
      {
        ...group,
        assets: [
          ...group.assets,
          { ...(values as Asset), id: this.firestoreService.generateId() },
        ],
      }
    );
  }
  editAsset(group: AssetGroup, values: Partial<Asset>) {
    if (values.id) {
      this.updateAsset(group, values);
    } else {
      this.createNewAsset(group, values);
    }
  }

  deleteGroup(groupId: string) {
    this.firestoreService.deleteDocument<AssetGroup>(
      COLLECTIONS.ASSETS,
      groupId
    );
  }
  sortGroupsByDate(groups: AssetGroup[]) {
    return groups.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }
  setIsPensionToDisplayValue(groups: AssetGroup[]) {
    return groups.map((group) => {
      const clonedGroup: AssetGroup = cloneDeep<AssetGroup>(group);
      clonedGroup.assets = clonedGroup.assets.map((asset) => {
        if (
          typeof asset.isPension === 'boolean' ||
          asset.isPension === undefined
        ) {
          asset.isPension = asset.isPension ? 'Yes' : 'No';
        }
        return asset;
      });
      return clonedGroup;
    });
  }
  getAssetNetWorth(group: AssetGroup): AssetGroupWorth {
    const accumulator: AssetGroupWorth = {
      withoutPension: 0,
      withPension: 0,
    };
    return group.assets.reduce((acc, asset) => {
      acc.withPension += +asset.amount;
      acc.withoutPension +=
        asset.isPension === true || asset.isPension === 'Yes'
          ? 0
          : +asset.amount;
      return acc;
    }, accumulator);
  }
}
