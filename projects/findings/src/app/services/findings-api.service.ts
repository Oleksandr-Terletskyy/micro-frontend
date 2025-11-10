import { Injectable, signal, Signal } from '@angular/core';
import { Finding } from 'shared';

@Injectable({ providedIn: 'root' })
export class FindingsApiService {
  private readonly mockFindings: Finding[] = [
    {
      id: 'f1',
      assetId: '1',
      severity: 'critical',
      title: 'Apache RCE',
      status: 'open',
    },
    {
      id: 'f2',
      assetId: '2',
      severity: 'high',
      title: 'SQL Injection',
      status: 'resolved',
    },
    {
      id: 'f3',
      assetId: '3',
      severity: 'medium',
      title: 'Weak TLS Cipher',
      status: 'open',
    },
    {
      id: 'f4',
      assetId: '4',
      severity: 'low',
      title: 'Missing CSP',
      status: 'closed',
    },
    {
      id: 'f5',
      assetId: '1',
      severity: 'high',
      title: 'Brute Force Attempt',
      status: 'in_progress',
    },
    {
      id: 'f6',
      assetId: '2',
      severity: 'critical',
      title: 'Zero-Day Exploit',
      status: 'open',
    },
    {
      id: 'f7',
      assetId: '3',
      severity: 'low',
      title: 'Outdated Firmware',
      status: 'open',
    },
    {
      id: 'f8',
      assetId: '4',
      severity: 'medium',
      title: 'Open Port 22',
      status: 'in_progress',
    },
  ];

  private readonly findingsSignal = signal<Finding[]>(this.mockFindings);

  public getFindings(): Signal<Finding[]> {
    return this.findingsSignal.asReadonly();
  }

  public resolveFinding(id: string): void {
    this.findingsSignal.update((findings) =>
      findings.map((f) =>
        f.id === id ? { ...f, status: 'resolved' as const } : f
      )
    );
  }
}
