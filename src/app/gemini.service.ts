import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private generativeAI: GoogleGenerativeAI;

  constructor() {
    // Initialize the Gemini AI instance with your API key
    //
    //the plde one ("AIzaSyDqz0ljo7lEKZamkcYxOLT1Uwfw9cABUSE")
    //
    this.generativeAI = new GoogleGenerativeAI('AIzaSyAwDuIF5D1PeCdhIZE6SQGznM4C18KgRp0');
  }
  async generateText2(question: string, language: string): Promise<string> {
    try {
      // Initialize the generative model
      const model = this.generativeAI.getGenerativeModel({ model: 'gemini-pro' });
  
      const result = await model.generateContent(`Please provide an insightful and helpful response less than 20 words to the following question in a small paragraph and  don't use special characters like '*+-' and use this language to answer: ${language}: ${question}`);
  
      // Extract the response text
      const response = await result.response.text();
      console.log('Gemini response:', response);
  
      // Return the answer, trimming any extra spaces
      return response.trim();
    } catch (error) {
      console.error('Error generating text with Gemini:', error);
      return 'Sorry, I encountered an error while processing your request.';
    }
  }
  

  // Helper function to generate content with a specific prompt and language
  async generateText(prompt: string, language: string): Promise<string> {
    try {
      const model = this.generativeAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(`Answer in one word in ${language}: ${prompt}`);
      const response = await result.response.text();
      console.log('Gemini response:', response);
      return response.trim(); // Trim any extra spaces from the response
    } catch (error) {
      console.error('Error generating text with Gemini:', error);
      return 'Sorry, I encountered an error while processing your request.';
    }
  }

  // Generate a random question with a word and choices
  async generateQuestion(language: string): Promise<{ word: string, correctAnswer: string, choices: string[] }> {
    try {
      await this.generateText('listen i am playing a game the word in English and 4 choices the user has to choose the correct one', language);
      // 1. Generate an English word
      const englishWord = await this.generateText("Provide a random English word.", "English");
      console.log("Generated English word:", englishWord);

      // 2. Translate the English word to French
      const frenchTranslation = await this.generateText(`What is the French translation of the word "${englishWord}"?`, "French");
      console.log("French translation:", frenchTranslation);

      // 3. Find the opposite of the word (either in English or French)
      const oppositeWord = await this.generateText(`provide a random word in French?`, "French");
      console.log("Opposite word:", oppositeWord);

      // 4. Generate another random word
      const randomWord = await this.generateText("Provide a random word in French", "French");
      console.log("Random word:", randomWord);
      const randomWord2 = await this.generateText("Provide another random word in French", "French");
      console.log("Random word:", randomWord2);

      // Construct the choices, where the first one is the correct answer
      const choices = [frenchTranslation, oppositeWord, randomWord, randomWord2];

      // Shuffle choices for randomness
      this.shuffleArray(choices);

      return {
        word: englishWord,
        correctAnswer: frenchTranslation,
        choices
      };
    } catch (error) {
      console.error('Error generating question with Gemini:', error);
      throw new Error('Failed to generate question');
    }
  }

  // Helper function to shuffle an array (for randomizing the choices)
  private shuffleArray(arr: string[]): void {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
  }

  // New function to generate a word of specific length and its related question
  async generateWordByLengthAndClue(length: number, clue: string): Promise<{ word: string, question: string }> {
    try {
      // Generate the word by the length and clue
      const prompt = `Provide a word that is ${length} letters long and matches the following clue: "${clue}"`;
      const generatedWord = await this.generateText(prompt, 'English');
      console.log("Generated word:", generatedWord);

      // Construct the question (e.g., "What is a ${length}-letter word for ${clue}?")
      const question = `What is a ${length}-letter word for: ${clue}?`;

      return {
        word: generatedWord,
        question: question
      };
    } catch (error) {
      console.error('Error generating word with clue and length:', error);
      throw new Error('Failed to generate word');
    }
  }
}
