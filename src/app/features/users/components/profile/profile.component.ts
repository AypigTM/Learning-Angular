import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, startWith, switchMap } from 'rxjs/operators';
import { User } from '../../data/models/user.model';
import { UserService } from '../../data/user.service';

type Vm = { state: 'loading' } | { state: 'error'; error: string } | { state: 'ready'; user: User };

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [AsyncPipe],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  private readonly _userService = inject(UserService);
  private readonly _route = inject(ActivatedRoute);

  private readonly _userId$: Observable<string> = this._route.paramMap.pipe(
    map((params) => params.get('id')),
    filter((id): id is string => !!id),
  );

  readonly vm$: Observable<Vm> = this._userService.refreshTrigger$.pipe(
    startWith(void 0),

    // chaque refresh lance un "cycle" complet (loading -> ready/error)
    switchMap(() => this.createVmCycle$()),
  );

  refresh(): void {
    this._userService.refresh();
  }

  fail(): void {
    this._userService.setShouldFail(true);
  }

  recover(): void {
    this._userService.setShouldFail(false);
  }

  /** Un cycle = une tentative de chargement avec ses états UI. */
  private createVmCycle$(): Observable<Vm> {
    return this._userId$.pipe(
      switchMap((id) =>
        this._userService.loadUserById(id).pipe(
          map((user) => this.ready(user)),
          startWith(this.loading()),
          catchError((err) => of(this.error(err))),
        ),
      ),
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
