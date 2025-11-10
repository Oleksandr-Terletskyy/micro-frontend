import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetsListComponent } from './assets-list.component';
import { AssetsService } from '../../services/assets.service';
import { signal } from '@angular/core';
import { Asset } from 'shared';
import { AssetsListItemComponent } from '../assets-list-item/assets-list-item.component';
import { By } from '@angular/platform-browser';

describe('AssetsListComponent', () => {
  let component: AssetsListComponent;
  let fixture: ComponentFixture<AssetsListComponent>;

  const mockAssets: Asset[] = [
    { id: '1', name: 'Server', status: 'Active', owner: 'DevOps' },
    { id: '2', name: 'Database', status: 'Maintenance', owner: 'Backend' },
  ];

  const mockAssetsService = {
    assets: signal(mockAssets),
    loadAssets: jasmine.createSpy('loadAssets'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsListComponent, AssetsListItemComponent],
      providers: [{ provide: AssetsService, useValue: mockAssetsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AssetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadAssets on init', () => {
    expect(mockAssetsService.loadAssets).toHaveBeenCalled();
  });

  it('should render toolbar with title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('.assets__title');
    expect(title?.textContent).toContain('Assets');
  });

  it('should render a list of asset items', () => {
    const itemEls = fixture.debugElement.queryAll(
      By.directive(AssetsListItemComponent)
    );
    expect(itemEls.length).toBe(2);

    const firstItemComponent =
      itemEls[0].componentInstance as AssetsListItemComponent;
    expect(firstItemComponent.asset.name).toBe('Server');
  });
});
