import { Injectable, signal, Signal } from '@angular/core';
import { Asset, AssetDetails } from 'shared';

@Injectable({ providedIn: 'root' })
export class AssetsApiService {
  private readonly mockAssets: Asset[] = [
    { id: '1', name: 'Server', status: 'Active', owner: 'DevOps' },
    { id: '2', name: 'Database', status: 'Maintenance', owner: 'Backend' },
    { id: '3', name: 'Router', status: 'Active', owner: 'Network' },
    { id: '4', name: 'Laptop', status: 'Inactive', owner: 'HR' },
  ];

  private readonly mockAssetsDetailed: AssetDetails[] = [
    {
      id: '1',
      name: 'Server',
      vulnerabilities: [
        { id: 'v1', severity: 'high', description: 'Outdated package' },
        { id: 'v2', severity: 'medium', description: 'Weak SSH credentials' },
      ],
    },
    {
      id: '2',
      name: 'Database',
      vulnerabilities: [
        { id: 'v3', severity: 'low', description: 'Missing security headers' },
      ],
    },
    {
      id: '3',
      name: 'Router',
      vulnerabilities: [
        { id: 'v4', severity: 'low', description: 'Missing routing' },
      ],
    },
    {
      id: '4',
      name: 'Laptop',
      vulnerabilities: [
        { id: 'v4', severity: 'medium', description: 'Missing Laptop' },
      ],
    },
  ];

  public getAssets(): Signal<Asset[]> {
    return signal<Asset[]>(this.mockAssets);
  }

  public getAssetById(id: string): Signal<AssetDetails | null> {
    const asset = this.mockAssetsDetailed.find((a) => a.id === id) ?? null;
    return signal<AssetDetails | null>(asset);
  }

  //   public getAssets(): Signal<Asset[]> {
  //   const request$: Observable<Asset[]> = this.http.get<Asset[]>(this.baseUrl);
  //   return toSignal(request$, { initialValue: [] });
  // }

  //   public getAssetById(id: string): Signal<AssetDetails | null> {
  //   const request$: Observable<AssetDetails> = this.http.get<AssetDetails>(
  //     `${this.baseUrl}/${id}`
  //   );
  //   return toSignal(request$, { initialValue: null });
  // }
}
