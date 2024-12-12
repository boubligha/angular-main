import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
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
    console.log('Quiz URL:', this.quizUrl);
    this.loadQuestions();
  }
  loadQuestions() {
    fetch(this.quizUrl || 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
      .then((res) => res.json())
      .then((loadedQuestions) => {
        console.log('Loaded Questions:', loadedQuestions);
        this.questions = loadedQuestions.results.map((loadedQuestion: any) => {
          // Ne pas mélanger les réponses
          const formattedQuestion: Question = {
            question: loadedQuestion.question,
            answer: 4, // Fixer la bonne réponse à la 4ème position
            choice1: loadedQuestion.incorrect_answers[0],
            choice2: loadedQuestion.incorrect_answers[1],
            choice3: loadedQuestion.incorrect_answers[2],
            choice4: loadedQuestion.correct_answer,
          };
  
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
      console.log(this.score);

      // Pass the score to the MotivationDialogComponent using 'data'
      this.dialog.open(MotivationDialogComponent, {
        width: '400px',
        data: { score: this.score } // Pass data through the `data` property
      });

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
  
    const correctAnswer = this.currentQuestion.answer;
  
    // Vérification si la réponse sélectionnée est correcte
    if (selectedAnswer === correctAnswer) {
      selectedChoice.classList.add('correct'); // Mettre la bonne réponse en vert
      this.incrementScore(10);  // Ajouter des points
    } else {
      selectedChoice.classList.add('incorrect'); // Mettre la mauvaise réponse en rouge
    }
  
    // Afficher la réponse correcte même si l'utilisateur a fait une erreur
    const choices = Array.from(document.getElementsByClassName('choice-text')) as HTMLElement[];
  
    // Trouver la bonne réponse dans les choix et appliquer la classe 'correct'
    const correctChoice = choices.find(choice => {
      const choiceNumber = choice.dataset['number'];
      return choiceNumber && parseInt(choiceNumber, 10) === correctAnswer;
    });
  
    if (correctChoice) {
      correctChoice.classList.add('correct'); // Mettre la bonne réponse en vert
    }
  
    // Passer à la question suivante après un délai
    setTimeout(() => {
      this.getNewQuestion(); // Charger la prochaine question
      choices.forEach(choice => {
        choice.classList.remove('correct', 'incorrect'); // Réinitialiser les classes
      });
    }, 1000);
  }
  
    
  

  incrementScore(num: number) {
    this.score += num;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
