import { Component, inject, OnInit } from '@angular/core';
import { UserMockService } from '../../lib/services/mocks/user.mock.service';
import { User } from '../../lib/interfaces/user.interfaces';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { CardModule } from 'primeng/card';

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
  private readonly _userService = inject(UserMockService);
  userListe$ : BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  ngOnInit(): void {
    this.userListe$.next(this._userService.getUser());
    console.log(this.userListe$.value);
  }
}
