import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';
import { Answer } from '../models/answer.model';
import { AnswerType } from '../models/answer-type.enum';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quizzes: Quiz[] = [
    {
      id: '1',
      title: 'Sample Quiz',
      description: 'This is a sample quiz.',
      questions: [
        {
          id: '1',
          text: 'What is the capital of France?',
          answers: [
            { id: '1', text: 'Berlin', is_correct: false, type: AnswerType.SINGLE_CHOICE },
            { id: '2', text: 'Madrid', is_correct: false, type: AnswerType.SINGLE_CHOICE },
            { id: '3', text: 'Paris', is_correct: true, type: AnswerType.SINGLE_CHOICE },
            { id: '4', text: 'Lisbon', is_correct: false, type: AnswerType.SINGLE_CHOICE }
          ]
        },
        {
          id: '2',
          text: 'Which language is used for web development?',
          answers: [
            { id: '1', text: 'Python', is_correct: false, type: AnswerType.SINGLE_CHOICE },
            { id: '2', text: 'Java', is_correct: false, type: AnswerType.SINGLE_CHOICE },
            { id: '3', text: 'JavaScript', is_correct: true, type: AnswerType.SINGLE_CHOICE },
            { id: '4', text: 'C#', is_correct: false, type: AnswerType.SINGLE_CHOICE }
          ]
        }
      ]
    }
  ];

  getQuizzes(): Observable<Quiz[]> {
    return of(this.quizzes);
  }

  getQuizById(id: string): Observable<Quiz | undefined> {
    const quiz = this.quizzes.find(q => q.id === id);
    return of(quiz);
  }
}