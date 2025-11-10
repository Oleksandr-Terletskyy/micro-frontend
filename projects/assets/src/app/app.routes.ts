import { Routes } from '@angular/router';
import { AssetsListComponent } from './components/assets-list/assets-list.component';
import { AssetOverviewComponent } from './components/asset-overview/asset-overview.component';

export const routes: Routes = [
  { path: '', component: AssetsListComponent },
  { path: ':id', component: AssetOverviewComponent },
];
