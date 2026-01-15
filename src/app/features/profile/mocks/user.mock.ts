export const MOCK_USERS = 
  [{
    id: '1',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    roles: [
      { id: 'admin', label: 'Administrateur', ponderation: '3' },
      { id: 'user', label: 'Utilisateur', ponderation: '1' },
    ],
  },
  {
    id: '2',
    firstName: 'Marie',
    lastName: 'Curie',
    email: 'marie.curie@example.com',
    roles: [
      { id: 'user', label: 'Utilisateur', ponderation: '1' },
    ],
  },
  {
    id: '3',
    firstName: 'Albert',
    lastName: 'Einstein',
    email: 'albert.einstein@example.com',
    roles: [
      { id: 'moderator', label: 'Modérateur', ponderation: '2' },
      { id: 'user', label: 'Utilisateur', ponderation: '1' },
    ],
  }];