import { Answer } from './answer.model';

export interface Question {
  id: string; // UUID
  text: string;
  answers?: Answer[];
  selectedOption?: string;
}
