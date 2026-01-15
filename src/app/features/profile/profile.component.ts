import { Component, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { AsyncPipe } from '@angular/common';

type Vm =
  | { state: 'loading' }
  | { state: 'error'; error: string }
  | { state: 'ready'; user: User };

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [AsyncPipe],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  private readonly userService = inject(UserService);

  readonly vm$: Observable<Vm> = this.userService.refreshTrigger$.pipe(
    startWith(void 0),

    // chaque refresh lance un "cycle" complet (loading -> ready/error)
    switchMap(() => this.createVmCycle$())
  );

  refresh(): void {
    this.userService.refresh();
  }

  fail(): void {
    this.userService.setShouldFail(true);
  }

  recover(): void {
    this.userService.setShouldFail(false);
  }

  /** Un cycle = une tentative de chargement avec ses états UI. */
  private createVmCycle$(): Observable<Vm> {
    return this.userService.loadUser().pipe(
      map(user => this.ready(user)),
      startWith(this.loading()),
      catchError(err => of(this.error(err)))
    );
  }

  private loading(): Vm {
    return { state: 'loading' };
  }

  private ready(user: User): Vm {
    return { state: 'ready', user };
  }

  private error(err: unknown): Vm {
    const message = err instanceof Error ? err.message : 'Erreur inconnue';
    return { state: 'error', error: message };
  }
}
