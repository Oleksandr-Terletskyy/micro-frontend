import { Component, OnInit, inject, Signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { MATERIAL_MODULES, Asset } from 'shared';
import { AssetsService } from '../../services/assets.service';
import { AssetsListItemComponent } from '../assets-list-item/assets-list-item.component';

@Component({
  selector: 'app-assets-list',
  standalone: true,
  imports: [NgFor, AssetsListItemComponent, ...MATERIAL_MODULES],
  templateUrl: './assets-list.component.html',
  styleUrls: ['./assets-list.component.scss'],
})
export class AssetsListComponent implements OnInit {
  private readonly assetsService = inject(AssetsService);
  protected readonly assets: Signal<Asset[]> = this.assetsService.assets;

  public ngOnInit(): void {
    this.assetsService.loadAssets();
  }
}
