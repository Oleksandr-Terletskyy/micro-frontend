import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MATERIAL_MODULES } from 'shared';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-metrics-overview',
  standalone: true,
  imports: [RouterOutlet, MATERIAL_MODULES, NgFor],
  templateUrl: './metrics-overview.component.html',
  styleUrl: './metrics-overview.component.scss',
})
export class MetricsOverivewComponent {
  protected metrics = [
    {
      title: 'Revenue',
      value: '$25,400',
      subtitle: 'This month',
      icon: 'attach_money',
    },
    { title: 'Users', value: '1,245', subtitle: 'Active users', icon: 'group' },
    {
      title: 'Orders',
      value: '320',
      subtitle: 'Completed',
      icon: 'shopping_cart',
    },
    {
      title: 'Conversion',
      value: '4.8%',
      subtitle: 'Compared to last week',
      icon: 'show_chart',
    },
  ];
}
