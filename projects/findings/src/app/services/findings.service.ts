import { Injectable, inject, signal, WritableSignal } from '@angular/core';
import { FindingsApiService } from './findings-api.service';
import { Finding } from 'shared';

@Injectable({ providedIn: 'root' })
export class FindingsService {
  private readonly findingsApiService = inject(FindingsApiService);

  private readonly rawFindings = this.findingsApiService.getFindings();

  private readonly severityOrder: Record<Finding['severity'], number> = {
    critical: 0,
    high: 1,
    medium: 2,
    low: 3,
  };

  public readonly findings: WritableSignal<Finding[]> = signal([]);

  constructor() {
    this.loadFindings();
  }

  public loadFindings(): void {
    const data = this.rawFindings();
    const sorted = [...data].sort((a, b) => {
      return this.severityOrder[a.severity] - this.severityOrder[b.severity];
    });
    this.findings.set(sorted);
  }

  public resolveFinding(id: string): void {
    this.findingsApiService.resolveFinding(id);
    this.loadFindings();
  }

  // TODO real api-methods

  // public readonly findings = toSignal(
  //   this.http.get<Finding[]>(this.apiUrl).pipe(
  //     map(data => [...data].sort((a, b) =>
  //       this.severityOrder[a.severity] - this.severityOrder[b.severity]
  //     ))
  //   ),
  //   { initialValue: [] }
  // );

  // public resolveFinding(id: string): void {
  //   this.http.patch<Finding>(`${this.apiUrl}/${id}`, { status: 'resolved' }).pipe(
  //     tap(() => this.findings.mutate(findings =>
  //       findings.map(f => f.id === id ? { ...f, status: 'resolved' } : f)
  //     ))
  //   ).subscribe();
  // }
}
