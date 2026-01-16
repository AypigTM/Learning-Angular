import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../data/user.service';

@Component({
  standalone: true,
  selector: 'app-user-random',
  imports: [],
  templateUrl: './user-random.component.html',
})
export class UserRandomComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);

  ngOnInit() {
    const id = this.userService.getRandomUserId();
    this.router.navigate(['../', id], { relativeTo: this.route });
  }
}
