import { Injectable, inject, signal, WritableSignal } from '@angular/core';
import { Asset, AssetDetails } from 'shared';
import { AssetsApiService } from './assets-api.service';

@Injectable({ providedIn: 'root' })
export class AssetsService {
  private readonly api: AssetsApiService = inject(AssetsApiService);

  public readonly assets: WritableSignal<Asset[]> = signal<Asset[]>([]);

  public readonly selectedAsset: WritableSignal<AssetDetails | null> =
    signal<AssetDetails | null>(null);

  public loadAssets(): void {
    const apiAssets = this.api.getAssets();
    this.assets.set(apiAssets());
  }

  public loadAssetById(id: string): void {
    const asset = this.api.getAssetById(id);
    this.selectedAsset.set(asset());
  }
}
