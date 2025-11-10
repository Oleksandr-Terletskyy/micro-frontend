import {
  Component,
  inject,
  signal,
  computed,
  WritableSignal,
} from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { Finding, MATERIAL_MODULES } from 'shared';
import { MatButtonModule } from '@angular/material/button';
import { FindingsService } from '../../services/findings.service';

@Component({
  selector: 'app-findings-list',
  standalone: true,
  imports: [CommonModule, UpperCasePipe, MatButtonModule, ...MATERIAL_MODULES],
  templateUrl: './findings-list.component.html',
  styleUrls: ['./findings-list.component.scss'],
})
export class FindingsListComponent {
  private readonly findingsService = inject(FindingsService);

  protected readonly findings: WritableSignal<Finding[]> =
    this.findingsService.findings;
  protected readonly displayedColumns = [
    'id',
    'assetId',
    'severity',
    'title',
    'status',
    'actions',
  ];

  ngOnInit(): void {
    this.findingsService.loadFindings();
  }

  protected resolve(id: string): void {
    this.findingsService.resolveFinding(id);
  }
}
