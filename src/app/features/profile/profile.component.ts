import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { CardModule } from 'primeng/card';
import { User } from './models/user.model';
import { UserService } from './user.service';

 type Vm = 
    | { state: 'loading'}
    | { state: 'error'; error: string }
    | { state: 'ready'; user: User  };

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    CardModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  
  private readonly _userService = inject(UserService);

  readonly vm$: Observable<Vm> = this._userService.user$.pipe(
    map(user => ({ state: 'ready' as const, user })),
    startWith({ state: 'loading' as const }),
    catchError(err =>
      of({ state: 'error' as const, error: err?.message ?? 'Erreur inconnue' })
    )
  );



  readonly user$: Observable<User> = this._userService.user$;

  ngOnInit(): void {
  }
    
}
