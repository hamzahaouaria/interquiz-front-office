import { Language } from './language.model';
import { Question } from './question.model';
import { Quiz } from './quiz.model';

export class Mission {
  id: number;
  name: string;
  description: string;
  language: Language;
  quizzes: Quiz[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.description = '';
    this.language = new Language();
    this.quizzes = [];
  }
}
