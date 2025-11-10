import { TestBed } from '@angular/core/testing';
import { FindingsService } from './findings.service';
import { FindingsApiService } from './findings-api.service';

class MockFindingsApiService {
  private findings = [
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
      title: 'Brute Force',
      status: 'in_progress',
    },
    {
      id: 'f6',
      assetId: '2',
      severity: 'critical',
      title: 'Zero-Day',
      status: 'open',
    },
    {
      id: 'f7',
      assetId: '3',
      severity: 'low',
      title: 'Outdated',
      status: 'open',
    },
    {
      id: 'f8',
      assetId: '4',
      severity: 'medium',
      title: 'Open Port',
      status: 'in_progress',
    },
  ];

  getFindings = jasmine
    .createSpy('getFindings')
    .and.returnValue(() => this.findings);

  resolveFinding = jasmine
    .createSpy('resolveFinding')
    .and.callFake((id: string) => {
      const f = this.findings.find((x) => x.id === id);
      if (f) f.status = 'resolved';
    });
}

describe('FindingsService', () => {
  let service: FindingsService;
  let mockApi: MockFindingsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FindingsService,
        { provide: FindingsApiService, useClass: MockFindingsApiService },
      ],
    });
    service = TestBed.inject(FindingsService);
    mockApi = TestBed.inject(FindingsApiService) as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadFindings()', () => {
    it('should load and sort findings by severity (critical > high > medium > low)', () => {
      service.loadFindings();
      const result = service.findings();

      const severities = result.map((f) => f.severity);
      expect(severities).toEqual([
        'critical',
        'critical',
        'high',
        'high',
        'medium',
        'medium',
        'low',
        'low',
      ]);

      const criticals = result.filter((f) => f.severity === 'critical');
      expect(criticals[0].id).toBe('f1');
      expect(criticals[1].id).toBe('f6');
    });

    it('should set findings signal with sorted data', () => {
      service.loadFindings();
      expect(service.findings()).toHaveSize(8);
    });
  });

  describe('resolveFinding(id)', () => {
    it('should call API resolveFinding and reload sorted data', () => {
      service.loadFindings();
      const initial = service.findings().find((f) => f.id === 'f1');
      expect(initial?.status).toBe('open');

      service.resolveFinding('f1');

      expect(mockApi.resolveFinding).toHaveBeenCalledWith('f1');
      const updated = service.findings().find((f) => f.id === 'f1');
      expect(updated?.status).toBe('resolved');
    });

    it('should maintain sort order after resolve', () => {
      service.resolveFinding('f6');
      const result = service.findings();

      const criticals = result.filter((f) => f.severity === 'critical');
      expect(criticals).toHaveSize(1);
      expect(criticals[0].id).toBe('f1');
    });
  });

  it('should call loadFindings in constructor', () => {
    const spy = spyOn(service, 'loadFindings');
    new FindingsService(mockApi as any);
    expect(spy).toHaveBeenCalled();
  });
});
