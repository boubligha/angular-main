import { Component, OnInit } from '@angular/core';
import axios from 'axios';

interface Quiz {
  id: null;
  title: string;
  // Add other quiz properties like difficulty and type if needed
}

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.css']
})
export class SecretComponent implements OnInit {
  id: number= 18;
  categories: any[] = [];
  entertainmentQuizzes: Quiz[] = [];
  otherCategories: any[] = [];
  selectedQuiz: Quiz | null = null; // Stores the selected quiz object
  loading: boolean = false; // Loading spinner status
  userName: string = 'Guest'; // Add userName property
  showQuizModal: boolean = false; // Flag to control modal visibility
  fetchedQuestions: any[] = []; // Array to store fetched questions
  constructor() {} // No need for injection with Axios

  ngOnInit() {
    this.fetchCategories();
    this.initializeUser();
  }

  async fetchCategories() {
    try {
      const response = await axios.get('https://opentdb.com/api_category.php');
      this.categories = response.data.trivia_categories.map((category: any) => ({
        name: category.name,
        id: category.id,
        quizzes: [
          { title: `${category.name} Quiz` } // Assuming no image for now
        ]
      }));

      this.entertainmentQuizzes = this.categories
        .filter(category => category.name.includes('Entertainment'))
        .flatMap(category => category.quizzes);

      this.otherCategories = this.categories.filter(category => !category.name.includes('Entertainment'));
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Handle the error appropriately
    }
  }

  initializeUser() {
    const name = prompt('Please enter your name:', 'Guest');
    this.userName = name ? name : 'Guest';
  }

  showQuiz(quiz: Quiz) {
    this.selectedQuiz = quiz;
    this.loading = true; // Start loading animation
  
    axios.get(`https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple&category=`+this.id)
      .then(response => {
        this.fetchedQuestions = response.data.results; // Store fetched questions
        this.showQuizModal = true; // Open the modal
        this.loading = false; // Stop loading animation
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
        // Handle the error appropriately
        this.loading = false; // Stop loading animation
        this.selectedQuiz = null; // Clear selected quiz on error
      });
  }
}