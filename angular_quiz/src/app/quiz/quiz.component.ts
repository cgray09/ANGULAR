import { Component, OnInit, computed, inject } from '@angular/core';
import { QuestionComponent } from './components/question/question.component';
import { QuizService } from './services/quiz.service';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
  standalone: true,
  imports: [QuestionComponent],
})
export class QuizComponent implements OnInit {
  quizService = inject(QuizService);

  ngOnInit(): void {
    this.quizService.getQuestions().subscribe({
      next: (questions) => {
        this.quizService.questions.set(questions);
      },
      error: (err) => {
        this.quizService.error.set(err.message);
      },
    });
  }
}
