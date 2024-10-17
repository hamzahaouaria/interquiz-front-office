import { Authority } from './authority.model';

export interface Role {
  id: string; // UUID
  name: string;
  authorities?: Authority[];
}
