import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MATERIAL_MODULES, Asset } from 'shared';

@Component({
  selector: 'app-assets-list-item',
  standalone: true,
  imports: [RouterLink, ...MATERIAL_MODULES],
  templateUrl: './assets-list-item.component.html',
  styleUrls: ['./assets-list-item.component.scss'],
})
export class AssetsListItemComponent {
  @Input({ required: true })
  public asset!: Asset;
}
