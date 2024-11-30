import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { ModalComponent } from '../modal/modal.component';

interface Quiz {
  id: number;
  title: string;
}

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.css']
})
export class SecretComponent implements OnInit {
  categories: any[] = [];
  selectedQuiz: Quiz | null = null;
  userName: string = 'Guest';
  fetchedQuestions: any[] = [];
  loading: boolean = false;

  constructor(private dialog: MatDialog) {
  
  } // Inject MatDialog service

  ngOnInit() {
    this.fetchCategories();
    this.initializeUser();
  }

  // Fetch categories from the trivia API
  async fetchCategories() {
    try {
      const response = await axios.get('https://opentdb.com/api_category.php');
      this.categories = response.data.trivia_categories.map((category: any) => ({
        name: category.name,
        id: category.id,
        quizzes: [{ title: `${category.name} Quiz` }]
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  // Initialize the user's name
  initializeUser() {
    const name = prompt('Please enter your name:', 'Guest');
    this.userName = name ? name : 'Guest';
  }

  // Open the quiz modal (Angular Material dialog)
  openQuizModal(quiz: Quiz) {
  const quizUrl = `https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple&category=${10}`;

  this.dialog.open(ModalComponent, {
    data: { quizUrl }, // Pass the URL to the modal component
    width: '600px',
  });
}

}
