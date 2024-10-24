import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperQuizComponent } from './developer-quiz.component';
import { QuizService } from 'app/services/quiz.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Question } from 'app/models/question.model';
import { AnswerType } from 'app/models/answer-type.enum';

describe('DeveloperQuizComponent', () => {
  let component: DeveloperQuizComponent;
  let fixture: ComponentFixture<DeveloperQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeveloperQuizComponent,BrowserAnimationsModule],
      providers: [provideHttpClientTesting(), provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloperQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test Method: evaluateMultipleChoiceQuestion
  it('evaluateMultipleChoiceQuestion', () => {
    let question:Question = {
      id: 1,
      questionText: 'What is the capital of France?',
      type:AnswerType.MULTIPLE,
      answers: [
        { id: 1, text: 'Paris', isCorrect: true, isSelected: true },
        { id: 2, text: 'London', isCorrect: false, isSelected: false },
        { id: 3, text: 'Berlin', isCorrect: true, isSelected: true },
        { id: 4, text: 'Madrid', isCorrect: false, isSelected: false }
      ]
    }
    component.evaluateMultipleChoiceQuestion(question);
    // Wrong answers should be 0
    expect(component.wrongAnswers.length).toBe(0);
    expect(component.score).toBe(1);
  });

  // Test Method: evaluateMultipleChoiceQuestion when wrong answer
  it('evaluateMultipleChoiceQuestion when wrong answer', () => {
    let question:Question = {
      id: 1,
      questionText: 'What is the capital of France?',
      type:AnswerType.MULTIPLE,
      answers: [
        { id: 1, text: 'Paris', isCorrect: true, isSelected: true },
        { id: 2, text: 'London', isCorrect: false, isSelected: false },
        { id: 3, text: 'Berlin', isCorrect: true, isSelected: false },
        { id: 4, text: 'Madrid', isCorrect: false, isSelected: false }
      ]
    }
    component.evaluateMultipleChoiceQuestion(question);
    expect(component.wrongAnswers.length).toBe(1);
    expect(component.score).toBe(0);
  });

  // Single choice is correct
  it('Single choice is correct', () => {
    let question:Question = {
      id: 1,
      questionText: 'What is the capital of France?',
      type:AnswerType.SINGLE,
      answers: [
        { id: 1, text: 'Paris', isCorrect: true, isSelected: true },
        { id: 2, text: 'London', isCorrect: false, isSelected: false },
      ]
    }
    component.evaluateSingleChoiceQuestion(question);
    expect(component.wrongAnswers.length).toBe(0);
    expect(component.score).toBe(1);
  });

  // Single choice is wrong
  it('Single choice is wrong', () => {
    let question:Question = {
      id: 1,
      questionText: 'What is the capital of France?',
      type:AnswerType.SINGLE,
      answers: [
        { id: 1, text: 'Paris', isCorrect: true, isSelected: false },
        { id: 2, text: 'London', isCorrect: false, isSelected: true },
      ]
    }
    component.evaluateSingleChoiceQuestion(question);
    expect(component.wrongAnswers.length).toBe(1);
    expect(component.score).toBe(0);
  });




});
