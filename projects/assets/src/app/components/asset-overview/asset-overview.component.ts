import { Component, OnInit, Signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetsService } from '../../services/assets.service';
import { MATERIAL_MODULES, AssetDetails } from 'shared';
import { NgIf, NgFor, NgClass, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-asset-overview',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, UpperCasePipe, ...MATERIAL_MODULES],
  templateUrl: './asset-overview.component.html',
  styleUrls: ['./asset-overview.component.scss'],
})
export class AssetOverviewComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly assetsService = inject(AssetsService);

  protected readonly asset: Signal<AssetDetails | null> =
    this.assetsService.selectedAsset;

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.assetsService.loadAssetById(id);
  }
}
