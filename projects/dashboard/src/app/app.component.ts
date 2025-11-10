import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MetricsOverivewComponent } from './metrics-overview/metrics-overview.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, MetricsOverivewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dashboard';
}
