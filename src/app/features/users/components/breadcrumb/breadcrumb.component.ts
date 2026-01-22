import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../../data/models/user.model';

export type Crumb = { label: string; url: any[] };

@Component({
  standalone: true,
  selector: 'app-breadcrumb',
  imports: [CommonModule, RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  public crumbs: Crumb[] = this.buildCrumbs();

  private buildCrumbs(): Crumb[] {
    const crumbs: Crumb[] = [];

    let route: ActivatedRoute | null = this.activatedRoute.root;
    let url: any[] = [];

    while (route) {
      const snap = route.snapshot;

      const segments = snap.url.map((s) => s.path).filter(Boolean);
      if (segments.length) url = [...url, ...segments];

      const bc = snap.data['breadcrumb'] as string | undefined;
      const id = snap.params['id'] as string | undefined;

      let label: string | undefined;
      if (bc && id) {
        label = `${bc} ${id}`;
      } else if (bc) {
        label = `${bc}`;
      }

      const user = snap.data['user'] as User | undefined;
      if (user) {
        label = `${user.lastName.toUpperCase()} ${user.firstName}`;
      }

      if (label) {
        crumbs.push({ label, url: ['/', ...url] });
      }

      route = route.firstChild ?? null;
    }
    return crumbs;
  }
}
