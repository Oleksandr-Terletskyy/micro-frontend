import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetOverviewComponent } from './asset-overview.component';
import { AssetsService } from '../../services/assets.service';
import { ActivatedRoute } from '@angular/router';
import { signal } from '@angular/core';
import { AssetDetails } from 'shared';

describe('AssetOverviewComponent', () => {
  let component: AssetOverviewComponent;
  let fixture: ComponentFixture<AssetOverviewComponent>;

  const mockAsset: AssetDetails = {
    id: '1',
    name: 'Server',
    vulnerabilities: [
      { id: 'v1', severity: 'high', description: 'Outdated package' },
      { id: 'v2', severity: 'medium', description: 'Weak SSH credentials' },
    ],
  };

  const mockAssetsService = {
    selectedAsset: signal(mockAsset),
    loadAssetById: jasmine.createSpy('loadAssetById'),
  };

  const mockActivatedRoute = {
    snapshot: { paramMap: new Map([['id', '1']]) },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetOverviewComponent],
      providers: [
        { provide: AssetsService, useValue: mockAssetsService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AssetOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadAssetById with route param id', () => {
    expect(mockAssetsService.loadAssetById).toHaveBeenCalledWith('1');
  });

  it('should render asset name in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.asset__name')?.textContent).toContain('Server');
  });

  it('should display vulnerabilities list', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const vulnItems = compiled.querySelectorAll('.asset__vuln');
    expect(vulnItems.length).toBe(2);
    expect(vulnItems[0].textContent).toContain('HIGH');
  });
});
