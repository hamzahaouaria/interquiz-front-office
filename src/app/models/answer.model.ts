import { AnswerType } from './answer-type.enum';

export interface Answer {
  id: string; // UUID
  text: string;
  is_correct: boolean;
  type: AnswerType;
  selected?: boolean;
}
