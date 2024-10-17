import { Role } from './role.model';
import { Authority } from './authority.model';

export interface User {
  id: string; // UUID
  username: string;
  password: string;
  email: string;
  roles?: Role[];
  authorities?: Authority[];
}