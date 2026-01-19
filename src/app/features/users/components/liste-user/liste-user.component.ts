import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { catchError, map, Observable, of, startWith, switchMap } from 'rxjs';
import { User } from '../../data/models/user.model';
import { UserService } from '../../data/user.service';
import { Router } from '@angular/router';

type Vm =
  | { state: 'loading' }
  | { state: 'error'; error: string }
  | { state: 'ready'; users: User[] };

@Component({
  selector: 'app-liste-user',
  imports: [AsyncPipe],
  templateUrl: './liste-user.component.html',
  styleUrl: './liste-user.component.css',
})
export class ListeUserComponent {
  private readonly _userService = inject(UserService);
  private readonly _router = inject(Router);

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

  open(id: string): void {
    console.log('connard');
    this._router.navigate(['users/user', id]);
  }

  private createVmCycle$(): Observable<Vm> {
    return this._userService.loadUsers().pipe(
      map((users) => this.ready(users)),
      startWith(this.loading()),
      catchError((err) => of(this.error(err))),
    );
  }

  private ready(users: User[]): Vm {
    return { state: 'ready', users };
  }

  private loading(): Vm {
    return { state: 'loading' };
  }

  private error(err: unknown): Vm {
    const message = err instanceof Error ? err.message : 'Erreur inconnue';
    return { state: 'error', error: message };
  }
}
