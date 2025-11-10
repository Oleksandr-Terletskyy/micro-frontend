import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindingsListComponent } from './findings-list.component';
import { FindingsService } from '../../services/findings.service';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';

const mockFindingsService = {
  findings: signal([
    {
      id: 'f1',
      assetId: '1',
      severity: 'critical',
      title: 'RCE',
      status: 'open',
    },
    {
      id: 'f2',
      assetId: '2',
      severity: 'high',
      title: 'SQLi',
      status: 'resolved',
    },
    { id: 'f3', assetId: '3', severity: 'low', title: 'CSP', status: 'closed' },
  ]),
  loadFindings: jasmine.createSpy('loadFindings'),
  resolveFinding: jasmine.createSpy('resolveFinding'),
};

describe('FindingsListComponent', () => {
  let component: FindingsListComponent;
  let fixture: ComponentFixture<FindingsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindingsListComponent],
      providers: [{ provide: FindingsService, useValue: mockFindingsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(FindingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadFindings on init', () => {
    expect(mockFindingsService.loadFindings).toHaveBeenCalled();
  });

  it('should display 3 rows', () => {
    const rows = fixture.debugElement.queryAll(By.css('mat-row'));
    expect(rows.length).toBe(3);
  });

  it('should show Resolve button only for open status', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(1);
    expect(buttons[0].nativeElement.textContent.trim()).toBe('Resolve');
  });

  it('should show "Resolved" for resolved status', () => {
    const resolvedLabel = fixture.debugElement.query(By.css('.resolved-label'));
    expect(resolvedLabel.nativeElement.textContent.trim()).toBe('Resolved');
  });

  it('should show "Closed" for closed status', () => {
    const closedLabel = fixture.debugElement.query(By.css('.closed-label'));
    expect(closedLabel.nativeElement.textContent.trim()).toBe('Closed');
  });

  it('should call resolve() with correct id when button clicked', () => {
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');
    expect(mockFindingsService.resolveFinding).toHaveBeenCalledWith('f1');
  });

  it('should have correct column order', () => {
    expect(component.displayedColumns).toEqual([
      'id',
      'assetId',
      'severity',
      'title',
      'status',
      'actions',
    ]);
  });
});
