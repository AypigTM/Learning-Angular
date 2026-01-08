import { Injectable, inject } from "@angular/core";
import { RoleMockService } from "./role.mock.service";
import { User } from '../../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserMockService {
    private readonly _roleMockService = inject(RoleMockService);

    getUser(): User {
        return {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            role: this._roleMockService.getRoles(),
        }
    }

}