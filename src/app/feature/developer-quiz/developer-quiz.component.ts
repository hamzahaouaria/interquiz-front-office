import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { QuizService } from 'app/services/quiz.service';
import { AnswerType } from 'app/models/answer-type.enum';
import { Quiz } from 'app/models/quiz.model';
import { Question } from 'app/models/question.model';
import { Answer } from 'app/models/answer.model';
import { SharedModule } from '@shared/shared.module';
import { MatCommonModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-developer-quiz',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    SharedModule,
    MatCommonModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './developer-quiz.component.html',
  styleUrls: ['./developer-quiz.component.scss']
})
export class DeveloperQuizComponent {
  quiz: Quiz | null = null;
  score: number = 0;
  quizCompleted: boolean = false;
  answerType = AnswerType;
  wrongAnswers: Question[] = [];

  missionDescription: string = 'Performance Testing,JMeter,Postman,RestFul api and grafana';
  loading: boolean = false;

  constructor(private quizService: QuizService) {
    this.getQuiz();
  }

  getQuiz(): void {
    this.quizService.getQuizzeMiniDummy().subscribe(quiz => {
      this.quiz = quiz;
    });
  }

  getQuizByMission(): void {
    this.loading = true; 
    this.quizService.getQuizByMission(this.missionDescription).subscribe(quiz => {
      this.quiz = quiz;
      this.loading = false; 
    });
  }

  selectedAnswerEvent(checked: boolean, answer: Answer): void {
    answer.isSelected = checked;
  }

  onBooleanAnswerSelected(question: Question, selectedValue: boolean): void {
    question.answers?.forEach(answer => {
      answer.isSelected = (answer.text === (selectedValue ? 'True' : 'False'));
    });
  }

  onSingleAnswerSelected(question: Question, selectedAnswer: Answer): void {
    question.answers?.forEach(answer => answer.isSelected = false); // Reset all answers
    selectedAnswer.isSelected = true; // Set the selected answer
  }

  submitQuiz(): void {
    this.score = 0;

    
  
    this.quiz?.questions?.forEach((question: Question) => {
      if (question.type === this.answerType.SINGLE) {
        // For single-choice questions, check if the selected answer is correct
        const selectedAnswer = question.answers?.find(answer => answer.isSelected);
        if (selectedAnswer?.isCorrect) {
          this.score++;
        } else {
          this.wrongAnswers.push(question);
        }
      } else if (question.type === this.answerType.MULTIPLE) {
        // For multiple-choice questions, check if all correct answers are selected and no incorrect ones
        const allCorrectSelected = question.answers?.every(answer => answer.isSelected === answer.isCorrect);
        if (allCorrectSelected) {
          this.score++;
        } else {
          this.wrongAnswers.push(question);
        }
      } else if (question.type === this.answerType.BOOLEAN) {
        // For boolean questions, check if the correct option is selected
        const selectedAnswer = question.answers?.find(answer => answer.isSelected);
        if (selectedAnswer?.isCorrect) {
          this.score++;
        } else {
          this.wrongAnswers.push(question);
        }
      }
    });
  
    this.quizCompleted = true;
  }
  

  retryQuiz(): void {
    this.quizCompleted = false;
    this.score = 0;

    if (this.quiz) {
      this.quiz.questions?.forEach((question: Question) => {
        question.answers?.forEach((answer: Answer) => {
          answer.isSelected = false; // Reset isSelected for each answer
        });
      });
    }
  }
}
