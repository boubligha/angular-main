import { Component, OnInit } from '@angular/core';
import { GeminiService } from '../gemini.service';

@Component({
  selector: 'app-language-game',
  templateUrl: './language-game.component.html',
  styleUrls: ['./language-game.component.css']
})
export class LanguageGameComponent implements OnInit {
  currentWord: string = '';
  choices: string[] = [];
  correctAnswer: string = '';
  selectedAnswer: string = '';
  feedback: string = '';
  score: number = 0;
  questionCount: number = 0;
  maxQuestions: number = 10;
  gameOver: boolean = false;

  constructor(private geminiService: GeminiService) {}

  ngOnInit(): void {
    this.startGame();
  }

  async startGame(): Promise<void> {
    this.resetGame();
    await this.loadQuestion();
  }

  async loadQuestion(): Promise<void> {
    if (this.questionCount >= this.maxQuestions) {
      this.gameOver = true;
      return;
    }

    try {
      const questionData = await this.geminiService.generateQuestion('es'); // Example: Spanish language
      this.currentWord = questionData.word;
      this.correctAnswer = questionData.correctAnswer;
      this.choices = this.shuffleChoices(questionData.choices);
      this.selectedAnswer = '';
      this.feedback = '';
    } catch (error) {
      console.error('Error loading question:', error);
    }
  }

  shuffleChoices(choices: string[]): string[] {
    return choices.sort(() => Math.random() - 0.5); // Shuffle the choices
  }

  checkAnswer(): void {
    if (this.selectedAnswer === this.correctAnswer) {
      this.feedback = 'Correct!';
      this.score += 10;
    } else {
      this.feedback = `Wrong! The correct answer is: ${this.correctAnswer}`;
    }
    this.questionCount++;
  }

  nextQuestion(): void {
    this.loadQuestion();
  }

  resetGame(): void {
    this.score = 0;
    this.questionCount = 0;
    this.gameOver = false;
  }

  restartGame(): void {
    this.startGame();
  }
}
