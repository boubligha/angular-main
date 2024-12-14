import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MotivationDialogComponent } from '../motivation-dialog/motivation-dialog.component';

interface Question {
  question: string;
  answer: number;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  [key: string]: string | number;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  quizUrl: string | undefined;
  currentQuestion: Question = {} as Question;
  acceptingAnswers = false;
  score = 0;
  questionCounter = 0;
  availableQuestions: Question[] = [];
  questions: Question[] = [];
  totalQuestions = 10;
  progressPercentage = 0;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.quizUrl = this.data.quizUrl;
    this.loadQuestions();
  }

  loadQuestions() {
    fetch(this.quizUrl || 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
      .then((res) => res.json())
      .then((loadedQuestions) => {
        this.questions = loadedQuestions.results.map((loadedQuestion: any) => {
          const formattedQuestion: Question = {
            question: loadedQuestion.question,
            answer: Math.floor(Math.random() * 4) + 1,
            choice1: loadedQuestion.incorrect_answers[0],
            choice2: loadedQuestion.incorrect_answers[1],
            choice3: loadedQuestion.incorrect_answers[2],
            choice4: loadedQuestion.correct_answer,
          };

          const choices = [
            formattedQuestion.choice1,
            formattedQuestion.choice2,
            formattedQuestion.choice3,
            formattedQuestion.choice4
          ];

          for (let i = choices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [choices[i], choices[j]] = [choices[j], choices[i]];
          }

          [formattedQuestion.choice1, formattedQuestion.choice2, formattedQuestion.choice3, formattedQuestion.choice4] = choices;

          return formattedQuestion;
        });
        this.startGame();
      })
      .catch((err) => console.error('Error loading questions:', err));
  }

  startGame() {
    this.questionCounter = 0;
    this.score = 0;
    this.availableQuestions = [...this.questions];
    this.getNewQuestion();
  }

  getNewQuestion() {
    if (this.availableQuestions.length === 0 || this.questionCounter >= this.totalQuestions) {
      localStorage.setItem('mostRecentScore', this.score.toString());
      this.dialog.open(MotivationDialogComponent, {
        width: '400px',
        data: { score: this.score }
      });

      return this.dialogRef.close();
    }

    this.questionCounter++;
    this.currentQuestion = this.availableQuestions[Math.floor(Math.random() * this.availableQuestions.length)];
    this.availableQuestions = this.availableQuestions.filter(q => q !== this.currentQuestion);
    this.updateUI();
    this.acceptingAnswers = true;
  }

  updateUI() {
    const questionText = document.getElementById('question');
    const choices = Array.from(document.getElementsByClassName('choice-text')) as HTMLElement[];

    if (questionText) {
      questionText.innerText = this.currentQuestion.question;
    }

    choices[0].innerText = this.currentQuestion.choice1;
    choices[1].innerText = this.currentQuestion.choice2;
    choices[2].innerText = this.currentQuestion.choice3;
    choices[3].innerText = this.currentQuestion.choice4;

    choices[0].dataset['number'] = String(1);
    choices[1].dataset['number'] = String(2);
    choices[2].dataset['number'] = String(3);
    choices[3].dataset['number'] = String(4);

    this.progressPercentage = (this.questionCounter / this.totalQuestions) * 100;
    const progressBarFull = document.getElementById('progressBarFull');
    if (progressBarFull) {
      progressBarFull.style.width = `${this.progressPercentage}%`;
    }

    const currentQuestionElement = document.getElementById('currentQuestion');
    const totalQuestionsElement = document.getElementById('totalQuestions');
    const scoreElement = document.getElementById('score');

    if (currentQuestionElement) {
      currentQuestionElement.innerText = String(this.questionCounter);
    }

    if (totalQuestionsElement) {
      totalQuestionsElement.innerText = String(this.totalQuestions);
    }

    if (scoreElement) {
      scoreElement.innerText = String(this.score);
    }
  }

  onChoiceSelected(event: any) {
    if (!this.acceptingAnswers) return;
    this.acceptingAnswers = false;

    const selectedChoice = event.target;
    const selectedAnswer = parseInt(selectedChoice.dataset['number'], 10);
    const isCorrect = selectedAnswer === this.currentQuestion.answer;

    if (isCorrect) {
      this.incrementScore(10);
    }

    this.getNewQuestion();
  }

  incrementScore(num: number) {
    this.score += num;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  startVoiceRecognition() {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const voiceInput = event.results[0][0].transcript;
      document.getElementById('voiceInput')!.innerText = `You said: ${voiceInput}`;
      this.startCountdown(voiceInput);
    };

    recognition.onspeechend = () => {
      recognition.stop();
    };

    recognition.onerror = (event: any) => {
      console.error('Error occurred in recognition: ' + event.error);
    };

    recognition.start();
  }

  startCountdown(voiceInput: string) {
    let countdown = 3;
    const countdownElement = document.getElementById('voiceInput')!;
    const interval = setInterval(() => {
      countdownElement.innerText = `You said: ${voiceInput} (Checking in ${countdown}...)`;
      countdown--;
      if (countdown < 0) {
        clearInterval(interval);
        this.checkVoiceAnswer(voiceInput);
      }
    }, 1000);
  }

  checkVoiceAnswer(voiceInput: string) {
    const correctAnswerText = this.getChoiceText(this.currentQuestion.answer);
    if (this.isAnswerClose(voiceInput, correctAnswerText)) {
      this.incrementScore(10);
    }
    this.getNewQuestion();
  }

  getChoiceText(answerNumber: number): string {
    switch (answerNumber) {
      case 1: return this.currentQuestion.choice1;
      case 2: return this.currentQuestion.choice2;
      case 3: return this.currentQuestion.choice3;
      case 4: return this.currentQuestion.choice4;
      default: return '';
    }
  }

  isAnswerClose(voiceInput: string, correctAnswerText: string): boolean {
    return this.levenshteinDistance(voiceInput.toLowerCase(), correctAnswerText.toLowerCase()) <= 2;
  }

  levenshteinDistance(a: string, b: string): number {
    const matrix = [];
    let i, j;
    for (i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (i = 1; i <= b.length; i++) {
      for (j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) == a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
        }
      }
    }
    return matrix[b.length][a.length];
  }
}
