import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetsListItemComponent } from './assets-list-item.component';
import { Asset } from 'shared';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';

describe('AssetsListItemComponent', () => {
  let component: AssetsListItemComponent;
  let fixture: ComponentFixture<AssetsListItemComponent>;

  const mockAsset: Asset = {
    id: '42',
    name: 'Firewall',
    status: 'Active',
    owner: 'Security Team',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssetsListItemComponent);
    component = fixture.componentInstance;
    component.asset = mockAsset;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render asset name, status and owner', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const name = compiled.querySelector('.assets-item__name')?.textContent;
    const status = compiled.querySelector('.assets-item__status')?.textContent;
    const owner = compiled.querySelector('.assets-item__owner')?.textContent;

    expect(name).toContain('Firewall');
    expect(status).toContain('Active');
    expect(owner).toContain('Security Team');
  });

  it('should have correct routerLink binding', () => {
    const linkDebugEl = fixture.debugElement.query(
      By.directive(RouterLinkWithHref)
    );
    const routerLinkInstance = linkDebugEl.injector.get(RouterLinkWithHref);
    expect(routerLinkInstance.href).toBe('/assets/42');
  });
});
