import { Authority } from './authority.model';

export interface Role {
  id: number; // UUID
  name: string;
  authorities?: Authority[];
}
