import { TestBed } from '@angular/core/testing';
import { MetricsOverivewComponent } from './metrics-overview.component';

describe('MetricsOverivewComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricsOverivewComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MetricsOverivewComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
