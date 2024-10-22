import { Question } from './question.model';

export interface Quiz {
  id: number; // UUID
  title: string;
  description: string;
  questions?: Question[];
}
