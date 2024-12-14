import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private generativeAI: GoogleGenerativeAI;

  constructor() {
    this.generativeAI = new GoogleGenerativeAI('AIzaSyDqz0ljo7lEKZamkcYxOLT1Uwfw9cABUSE');
  }

  async generateText(prompt: string, language: string): Promise<string> {
    try {
      const model = this.generativeAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(`answer in a small paragraph like a human in ${language}. Don't talk a lot, and in the end ask me like a friend now let's go. ${prompt}`);
      const response = await result.response.text(); // Extract the text from the response
      console.log('Gemini response:', response);
      return response; // Return the response text
    } catch (error) {
      console.error('Error generating text with Gemini:', error);
      return 'Sorry, I encountered an error while processing your request.';
    }
  }

  async generateQuestion(language: string): Promise<{ word: string, correctAnswer: string, choices: string[] }> {
    try {
      const prompt = `For a language learning game, provide an English word with four choices. The first choice is the correct answer, and the other three are incorrect. The language for translation is ${language}.`;
      const model = this.generativeAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(prompt);
      const response = await result.response.text(); // Extract the text from the response
      console.log('Gemini response:', response);

      // Parsing the response based on the expected format
      const wordMatch = response.match(/\*\*English word:\*\* (.+)/);
      const choicesMatch = response.match(/\*\*Spanish choices:\*\*\n1\. (.+)\n2\. (.+)\n3\. (.+)\n4\. (.+)/);

      if (wordMatch && choicesMatch) {
        const word = wordMatch[1];
        const correctAnswer = choicesMatch[1]; // First choice is the correct answer
        const choices = [choicesMatch[1], choicesMatch[2], choicesMatch[3], choicesMatch[4]];

        return { word, correctAnswer, choices };
      } else {
        throw new Error('Failed to parse response');
      }
    } catch (error) {
      console.error('Error generating question with Gemini:', error);
      throw new Error('Failed to generate question');
    }
  }
}
