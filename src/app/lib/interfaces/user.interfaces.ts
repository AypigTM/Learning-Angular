export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role[];
}

export interface Role {
    id: string;
    label: string;
    ponderation: string;
}