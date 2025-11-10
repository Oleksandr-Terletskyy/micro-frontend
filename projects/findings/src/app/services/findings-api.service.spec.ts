import { TestBed } from '@angular/core/testing';
import { FindingsApiService } from './findings-api.service';
import { Finding } from 'shared';

describe('FindingsApiService', () => {
  let service: FindingsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FindingsApiService],
    });
    service = TestBed.inject(FindingsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFindings()', () => {
    it('should return readonly signal with mock data', () => {
      const findings = service.getFindings()();
      expect(findings).toHaveSize(8);
      expect(findings[0].id).toBe('f1');
      expect(findings[0].severity).toBe('critical');
    });

  });

  describe('resolveFinding(id)', () => {
    it('should update status to "resolved" for given id', () => {
      const initial = service.getFindings()();
      const target = initial.find((f) => f.id === 'f1');
      expect(target?.status).toBe('open');

      service.resolveFinding('f1');

      const updated = service.getFindings()();
      const updatedTarget = updated.find((f) => f.id === 'f1');
      expect(updatedTarget?.status).toBe('resolved');
    });

    it('should not affect other findings', () => {
      const before = service.getFindings()();
      const unaffected = before.find((f) => f.id === 'f2');
      expect(unaffected?.status).toBe('resolved');

      service.resolveFinding('f1');

      const after = service.getFindings()();
      const stillUnaffected = after.find((f) => f.id === 'f2');
      expect(stillUnaffected?.status).toBe('resolved');
    });

    it('should create new array reference (immutable update)', () => {
      const oldRef = service.getFindings()();
      service.resolveFinding('f1');
      const newRef = service.getFindings()();
      expect(oldRef).not.toBe(newRef);
    });
  });
});
