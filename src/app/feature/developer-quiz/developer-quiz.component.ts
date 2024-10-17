import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '@models/quiz.model';
import { SharedModule } from '../../shared/shared.module';
import { AnswerType } from '@models/answer-type.enum';

@Component({
  selector: 'app-developer-quiz',
  templateUrl: './developer-quiz.component.html',
  styleUrls: ['./developer-quiz.component.scss'],
  standalone: true,
  imports: [SharedModule], // Ensure SharedModule is imported
})
export class DeveloperQuizComponent implements OnInit {
  quizzes: Quiz[] = [];
  selectedQuiz?: Quiz;
  score: number = 0;
  quizCompleted: boolean = false;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.quizService.getQuizzes().subscribe((quizzes) => {
      this.quizzes = quizzes;
      this.selectedQuiz = quizzes[0]; 
    });
  }

  selectQuiz(id: string): void {
    this.quizService.getQuizById(id).subscribe((quiz) => {
      this.selectedQuiz = quiz;
      this.quizCompleted = false;
      this.score = 0;
    });
  }

  submitQuiz(): void {
    if (this.selectedQuiz) {
      this.score = this.selectedQuiz.questions?.reduce((score, question) => {
        const correctAnswers = question.answers?.filter(answer => answer.is_correct);
        const selectedAnswers = question.answers?.filter(answer => answer.selected);

        // Check if the selected answers match the correct answers
        if (
          correctAnswers?.length === selectedAnswers?.length &&
          correctAnswers?.every(answer => selectedAnswers?.includes(answer))
        ) {
          return score + 1; // Increment score for a correct answer
        }
        return score; // Return current score if not correct
      }, 0) ?? 0; // Use nullish coalescing to handle null case

      this.quizCompleted = true; // Mark the quiz as completed
    }
  }

  // Get the AnswerType enum for use in the template
  getAnswerType(): typeof AnswerType {
    return AnswerType;
  }
}
