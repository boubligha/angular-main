import { Component, OnInit } from '@angular/core';
import { OpenAIService } from '../open-ai.service';
import { GeminiService } from '../gemini.service';


@Component({
  selector: 'app-culture-generale',
  templateUrl: './culture-generale.component.html',
  styleUrl: './culture-generale.component.css'
})

export class CultureGeneraleComponent implements OnInit {
  questions: { clue: string, direction: string, length: number, question: string }[] = [];
  answers: string[] = [];

  constructor(private geminiService: GeminiService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  // Load the crossword questions dynamically
  async loadQuestions(): Promise<void> {
    const cluesData = [
      { clue: 'A Music Show', direction: 'Across', length: 7 },
      { clue: 'An alternate for Result', direction: 'Down', length: 7 },
      { clue: 'Creative work', direction: 'Down', length: 5 },
      { clue: 'Dark Knight', direction: 'Across', length: 6 },
      { clue: 'You get what you give', direction: 'Down', length: 4 },
      { clue: 'Used in Dark', direction: 'Across', length: 5 },
      { clue: 'No corners', direction: 'Down', length: 5 },
      { clue: 'mightier than sword', direction: 'Across', length: 3 },
      { clue: 'Once in a Year', direction: 'Across', length: 9 }
    ];

    for (const clueData of cluesData) {
      // Use the generateWordByLengthAndClue method from GeminiService
      const { word, question } = await this.geminiService.generateWordByLengthAndClue(clueData.length, clueData.clue);
      this.questions.push({
        clue: clueData.clue,
        direction: clueData.direction,
        length: clueData.length,
        question: question
      });
      this.answers.push(word);
    }
  }

  // Show answers on the button click (optional feature)
  showAnswers(): void {
    const answersList = document.getElementById('answers')!;
    answersList.style.display = 'block';
  }
}
