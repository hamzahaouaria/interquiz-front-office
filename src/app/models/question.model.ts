import { AnswerType } from './answer-type.enum';
import { Answer } from './answer.model';

export interface Question {
  id: number; // UUID
  questionText: string;
  answers?: Answer[];
  explanation?:string,
  type?:AnswerType

}
