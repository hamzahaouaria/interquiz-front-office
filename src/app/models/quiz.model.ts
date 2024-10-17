import { Question } from './question.model';

export interface Quiz {
  id: string; // UUID
  title: string;
  description: string;
  questions?: Question[];
}
