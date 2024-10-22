import { AnswerType } from './answer-type.enum';

export interface Answer {
  id: number; // UUID
  text: string;
  isCorrect: boolean;
  isSelected?:boolean;
}
