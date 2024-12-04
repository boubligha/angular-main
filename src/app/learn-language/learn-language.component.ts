import { Component, OnInit } from '@angular/core';
import { GeminiService } from '../gemini.service';

@Component({
  selector: 'app-learnlanguage',
  templateUrl: './learn-language.component.html',
  styleUrls: ['./learn-language.component.css'],
})
export class LearnlanguageComponent implements OnInit {
  prompt: string = '';
  chatHistory: any[] = [];
  loading: boolean = false;

  constructor(private geminiService: GeminiService) {}

  ngOnInit(): void {
    this.geminiService.getMessageHistory().subscribe((message) => {
      if (message) {
        this.chatHistory.push(message);
      }
    });
  }

  async sendData() {
    if (this.prompt.trim() && !this.loading) {
      this.loading = true;
      this.chatHistory.push({ from: 'user', message: this.prompt });

      const response = await this.geminiService.generateText(this.prompt);
      this.chatHistory.push({ from: 'bot', message: response });
      this.prompt = '';
      this.loading = false;
    }
  }
}
