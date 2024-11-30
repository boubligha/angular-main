import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface Question {
  question: string;
  answer: number;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  [key: string]: string | number; // This allows dynamic properties
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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.quizUrl = this.data.quizUrl;
    console.log('Quiz URL:', this.quizUrl);
    this.loadQuestions();
  }

  loadQuestions() {
    fetch(this.quizUrl || 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
      .then((res) => res.json())
      .then((loadedQuestions) => {
        console.log('Loaded Questions:', loadedQuestions);
        this.questions = loadedQuestions.results.map((loadedQuestion: any) => {
          const formattedQuestion: Question = {
            question: loadedQuestion.question,
            answer: Math.floor(Math.random() * 4) + 1, // Randomize the answer position
            choice1: loadedQuestion.incorrect_answers[0],
            choice2: loadedQuestion.incorrect_answers[1],
            choice3: loadedQuestion.incorrect_answers[2],
            choice4: loadedQuestion.correct_answer, // Correct answer inserted at random position
          };

          // Shuffle the choices so that correct answer isn't always at the same position
          const choices = [
            formattedQuestion.choice1,
            formattedQuestion.choice2,
            formattedQuestion.choice3,
            formattedQuestion.choice4
          ];

          // Shuffle choices array
          for (let i = choices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [choices[i], choices[j]] = [choices[j], choices[i]]; // Swap elements
          }

          // Reassign the shuffled choices to the formattedQuestion
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
      return this.dialogRef.close();
    }

    this.questionCounter++;
    this.currentQuestion = this.availableQuestions[Math.floor(Math.random() * this.availableQuestions.length)];
    this.availableQuestions = this.availableQuestions.filter((q: Question) => q !== this.currentQuestion);

    this.updateUI();
    this.acceptingAnswers = true;
  }

  updateUI() {
    const questionText = document.getElementById('question');
    const choices = Array.from(document.getElementsByClassName('choice-text')) as HTMLElement[];

    if (questionText) {
      questionText.innerText = this.currentQuestion.question;
    }

    // Set choices for each of the choice elements
    choices[0].innerText = this.currentQuestion.choice1;
    choices[1].innerText = this.currentQuestion.choice2;
    choices[2].innerText = this.currentQuestion.choice3;
    choices[3].innerText = this.currentQuestion.choice4;

    // Convert the choices into data-number attributes for comparison later
    choices[0].dataset['number'] = String(1);
    choices[1].dataset['number'] = String(2);
    choices[2].dataset['number'] = String(3);
    choices[3].dataset['number'] = String(4);

    // Update the progress bar
    this.progressPercentage = (this.questionCounter / this.totalQuestions) * 100;
    const progressBarFull = document.getElementById('progressBarFull');
    if (progressBarFull) {
      progressBarFull.style.width = `${this.progressPercentage}%`;
    }

    // Update the HUD elements
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
    const classToApply = selectedAnswer === this.currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
      this.incrementScore(10);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      this.getNewQuestion(); // Proceed to the next question after 1 second
    }, 1000);
  }

  incrementScore(num: number) {
    this.score += num;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
