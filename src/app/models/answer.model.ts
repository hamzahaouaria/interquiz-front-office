import { AnswerType } from './answer-type.enum';

export class Answer {
  id: number; // UUID
  text: string;
  isCorrect: boolean;
  isSelected? = false;

  constructor() {
    this.id = 0;
    this.text = '';
    this.isCorrect = false;
    this.isSelected = false;
  }
}
