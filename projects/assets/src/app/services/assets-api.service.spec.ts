import { TestBed } from '@angular/core/testing';
import { AssetsApiService } from './assets-api.service';
import { Asset, AssetDetails } from 'shared';

describe('AssetsApiService', () => {
  let service: AssetsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssetsApiService],
    });
    service = TestBed.inject(AssetsApiService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should return all assets via getAssets()', () => {
    const assetsSignal = service.getAssets();
    const assets: Asset[] = assetsSignal();
    expect(assets.length).toBe(4);
    expect(assets[0].name).toBe('Server');
    expect(assets[1].owner).toBe('Backend');
  });

  it('should return single asset details by id', () => {
    const assetSignal = service.getAssetById('1');
    const asset: AssetDetails | null = assetSignal();
    expect(asset).toBeTruthy();
    expect(asset?.name).toBe('Server');
    expect(asset?.vulnerabilities.length).toBe(2);
    expect(asset?.vulnerabilities[0].severity).toBe('high');
  });

  it('should return null for non-existing asset id', () => {
    const assetSignal = service.getAssetById('999');
    const asset: AssetDetails | null = assetSignal();
    expect(asset).toBeNull();
  });
});
