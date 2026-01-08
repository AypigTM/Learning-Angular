import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RoleMockService {
    getRoles() {
        return [
            { id: '1', label: 'Admin', ponderation: '2' },
            { id: '2', label: 'User', ponderation: '1' },
            { id: '3', label: 'Guest', ponderation: '0' },
        ];
    }

}