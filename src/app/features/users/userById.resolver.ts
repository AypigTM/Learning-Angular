import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { User } from './data/models/user.model';
import { UserService } from './data/user.service';

export const userByIdResolver: ResolveFn<User> = (route) => {
  const userService = inject(UserService);
  const id = route.paramMap.get('id');

  if (!id) {
    throw new Error('Missing route param "id"');
  }

  return userService.loadUserById(id);
};
