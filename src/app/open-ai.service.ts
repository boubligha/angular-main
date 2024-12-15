import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class OpenAIService {
  private apiKey: string = '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'; // Replace with your OpenAI API key

  constructor() {}

  async generateText(prompt: string): Promise<string> {
    try {
      const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: prompt,
        max_tokens: 100,
        n: 1,
        stop: null,
        temperature: 0.5,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error generating text with OpenAI:', error);
      return 'Sorry, I encountered an error while processing your request.';
    }
  }

  async generateQuestion(language: string): Promise<{ word: string, correctAnswer: string, choices: string[] }> {
    try {
      const prompt = `For a language learning game, provide an English word with four choices translated into ${language}. The first choice is the correct answer, and the other three are incorrect.`;
      const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: prompt,
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.5,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      const text = response.data.choices[0].text.trim();
      const lines = text.split('\n');
      const word = lines[0].split(':')[1].trim();
      const correctAnswer = lines[1].split(':')[1].trim();
      const choices = lines.slice(2).map((line: string) => line.trim());

      return { word, correctAnswer, choices };
    } catch (error) {
      console.error('Error generating question with OpenAI:', error);
      throw new Error('Failed to generate question');
    }
  }
}
