import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MotivationDialogComponent } from '../motivation-dialog/motivation-dialog.component';

interface Quiz {
  id: number;
  title: string;
}

interface Category {
  id: number;
  name: string;
  quizzes: Quiz[];
}

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.css']
})
export class SecretComponent implements OnInit {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  selectedQuiz: Quiz | null = null;
  searchQuery: string = ''; // La variable liée à la barre de recherche
  userName: string = 'salma';
  loading: boolean = false;

  constructor(private dialog: MatDialog) {} // Inject MatDialog service

  ngOnInit() {
    this.fetchCategories();
    this.initializeUser();
  }

  // Initialize the user's name
  initializeUser() {
    console.log(`Welcome, ${this.userName}`);
  }

  // Méthode pour récupérer les catégories
  async fetchCategories() {
    this.loading = true; // Afficher un indicateur de chargement
    try {
      const response = await axios.get('https://opentdb.com/api_category.php');
      this.categories = response.data.trivia_categories.map((category: any) => ({
        id: category.id,
        name: category.name,
        quizzes: [{ id: category.id, title: `${category.name} Quiz` }]
      }));
      this.filteredCategories = [...this.categories]; // Initialisation des catégories filtrées
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      this.loading = false; // Masquer l'indicateur de chargement
    }
  }

  // Méthode pour filtrer les catégories en fonction de la recherche
  filterCategories() {
    if (this.searchQuery.trim() === '') {
      this.filteredCategories = [...this.categories];
    } else {
      this.filteredCategories = this.categories.filter(category =>
        category.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  // Ouvrir le modal pour un quiz sélectionné avec validation
  openQuizModal(quiz: Quiz) {
    if (!quiz || !quiz.id) {
      console.error('Invalid quiz selected');
      alert('Le quiz sélectionné est invalide. Veuillez réessayer.');
      return;
    }

    const quizUrl = `https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple&category=${quiz.id}`;
    this.dialog.open(ModalComponent, {
      data: { quizUrl }, // Passer l'URL au modal component
      width: '600px',
    });
  }

  // Ouvrir la carte de motivation
  openMotivationCard() {
    this.dialog.open(MotivationDialogComponent, {
      width: '400px'
    });
  }
}
