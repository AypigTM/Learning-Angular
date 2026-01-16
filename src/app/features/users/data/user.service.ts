import { Injectable } from '@angular/core';
import { Observable, Subject, defer, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MOCK_USERS } from './mocks/user.mock';
import { User } from './models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly refresh$ = new Subject<void>();

  private lastUserId: string | null = null;
  private shouldFail = false;

  /** Exposé au composant pour déclencher le cycle de chargement (lecture seule). */
  readonly refreshTrigger$: Observable<void> = this.refresh$.asObservable();

  refresh(): void {
    this.refresh$.next();
  }

  setShouldFail(value: boolean): void {
    this.shouldFail = value;
    this.refresh(); // relance un cycle avec le nouvel état
  }

  loadUserById(id: string): Observable<User> {
    return defer(() => {
      if (this.shouldFail) {
        return throwError(() => new Error(`Echec du chargement`));
      }
      const user = MOCK_USERS.find((user) => user.id === id);

      if (!user) {
        return throwError(() => new Error(`Echec du chargement de l'utilisateur ${id}`));
      }
      return of(user).pipe(delay(50));
    });
  }

  loadUsers(): Observable<User[]> {
    return defer(() => {
      if (this.shouldFail) {
        return throwError(() => new Error('Échec du chargement des utilisateurs'));
      }
      return of(MOCK_USERS);
    }).pipe(delay(50));
  }

  getRandomUserId(): string {
    if (MOCK_USERS.length === 0) {
      throw new Error('MOCK_USERS est vide');
    }
    const idx = Math.floor(Math.random() * MOCK_USERS.length);
    return MOCK_USERS[idx].id;
  }
}
