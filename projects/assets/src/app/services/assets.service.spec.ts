import { TestBed } from '@angular/core/testing';
import { AssetsService } from './assets.service';
import { AssetsApiService } from './assets-api.service';
import { Asset, AssetDetails } from 'shared';
import { signal } from '@angular/core';

describe('AssetsService', () => {
  let service: AssetsService;

  const mockAssets: Asset[] = [
    { id: '1', name: 'Server', status: 'Active', owner: 'DevOps' },
    { id: '2', name: 'Database', status: 'Maintenance', owner: 'Backend' },
  ];

  const mockAssetDetails: AssetDetails = {
    id: '1',
    name: 'Server',
    vulnerabilities: [
      { id: 'v1', severity: 'high', description: 'Outdated package' },
    ],
  };

  const mockApiService = {
    getAssets: jasmine
      .createSpy('getAssets')
      .and.returnValue(signal(mockAssets)),
    getAssetById: jasmine
      .createSpy('getAssetById')
      .and.returnValue(signal(mockAssetDetails)),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AssetsApiService, useValue: mockApiService }],
    });
    service = TestBed.inject(AssetsService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial empty signals', () => {
    expect(service.assets()).toEqual([]);
    expect(service.selectedAsset()).toBeNull();
  });

  it('should load assets and update assets signal', () => {
    service.loadAssets();
    expect(mockApiService.getAssets).toHaveBeenCalled();
    const currentAssets = service.assets();
    expect(currentAssets.length).toBe(2);
    expect(currentAssets[0].name).toBe('Server');
  });

  it('should load single asset and update selectedAsset signal', () => {
    service.loadAssetById('1');
    expect(mockApiService.getAssetById).toHaveBeenCalledWith('1');
    const currentAsset = service.selectedAsset();
    expect(currentAsset?.id).toBe('1');
    expect(currentAsset?.vulnerabilities.length).toBe(1);
    expect(currentAsset?.vulnerabilities[0].severity).toBe('high');
  });
});
