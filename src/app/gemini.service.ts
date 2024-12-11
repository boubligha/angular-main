// gemini.service.ts
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

  async generateText(prompt: string): Promise<string> {
    try {
      const model = this.generativeAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent("answer in a small paragraphe like a humain don't talk a lot and in the end ask me like a friend of me now let's go."+prompt);
      const response = await result.response;
      const text = await response.text(); // Extract the text from the response
      console.log('Gemini response:', text);
      return text; // Return the response text
    } catch (error) {
      console.error('Error generating text with Gemini:', error);
      return 'Sorry, I encountered an error while processing your request.';
    }
  }
}
