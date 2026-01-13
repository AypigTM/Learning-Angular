import { Injectable } from '@angular/core';
import { Observable, defer, of, throwError } from 'rxjs';
import { delay, shareReplay } from 'rxjs/operators';
import { User } from './models/user.model';
import { MOCK_USER } from './mocks/user.mock';

@Injectable({ providedIn: 'root' })
export class UserService {
  // Toggle pour tester l'UI erreur (tu pourras le retirer après)
  private readonly shouldFail = false;

  // Contrat principal: le composant consomme ça, rien d'autre.
  readonly user$: Observable<User> = defer(() => {
    if (this.shouldFail) {
      return throwError(() => new Error('Impossible de charger le profil'));
    }
    return of(MOCK_USER);
  }).pipe(
    delay(300),              // simule une requête
    shareReplay({ bufferSize: 1, refCount: true }) // cache simple
  );
}
