export const UserRole = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
};

export const ROLE_LABELS = {
  [UserRole.SUPER_ADMIN]: 'Super Admin',
  [UserRole.ADMIN]: 'Admin',
  [UserRole.STAFF]: 'Staff',
};

export const ROLE_DESCRIPTIONS = {
  [UserRole.SUPER_ADMIN]: 'Bisa manage multiple events',
  [UserRole.ADMIN]: 'Full access per event',
  [UserRole.STAFF]: 'Check-in & foto langsung WA',
};
