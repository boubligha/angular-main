import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { GeminiService } from '../gemini.service';
import { SpeechService } from '../speech.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-learnlanguage',
  templateUrl: './learn-language.component.html',
  styleUrls: ['./learn-language.component.css'],
})
export class LearnlanguageComponent implements OnInit, OnDestroy {
  prompt: string = '';
  chatHistory: any[] = [];
  loading: boolean = false;
  private recognition: any;
  spokenWords: string = '';

  constructor(
    private geminiService: GeminiService,
    private speechService: SpeechService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.setupSpeechRecognition();
  }

  ngOnInit(): void {
    this.geminiService.getMessageHistory().subscribe((message) => {
      if (message) {
        this.chatHistory.push(message);
      }
    });

    if (isPlatformBrowser(this.platformId) && this.recognition) {
      this.recognition.onresult = (event: any) => {
        this.spokenWords = event.results[0][0].transcript;
        this.prompt = this.spokenWords;
        this.sendData();
      };
    }
  }

  ngOnDestroy() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  setupSpeechRecognition() {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'en-US';
    } else {
      console.warn('Speech Recognition is not available in this environment.');
    }
  }

  startListening() {
    if (this.recognition) {
      this.recognition.start();
    }
  }

  async sendData() {
    if (this.prompt.trim() && !this.loading) {
      this.loading = true;
      this.chatHistory.push({ from: 'user', message: this.prompt });

      await this.geminiService.generateText(this.prompt);

      // Since generateText updates the messageHistory BehaviorSubject,
      // we don't need to directly update chatHistory here again.
      
      this.prompt = '';
      this.loading = false;
    }
  }

  computerSpeech(words: string) {
    if (typeof window !== 'undefined') {
      const speech = new SpeechSynthesisUtterance(words);
      speech.lang = 'en-US';
      speech.pitch = 1;
      speech.volume = 1;
      speech.rate = 1;
      window.speechSynthesis.speak(speech);
    }
  }

  handleSpeechResponse() {
    const response = this.generateDynamicResponse(this.spokenWords);
    console.log('Response:', response);
    this.computerSpeech(response);
  }

  generateDynamicResponse(spokenWords: string): string {
    const lowerCaseWords = spokenWords.toLowerCase();
  
    if (lowerCaseWords.includes('hello') || lowerCaseWords.includes('hi')) {
      const currentTime = new Date().toLocaleTimeString();
      return `Hello! Welcome to the Quiz App. My name is Souso, your virtual assistant! The current time is ${currentTime}. Our mission is to provide an engaging and fun learning experience through various quiz categories. We believe quizzes can be an effective way to test your knowledge and have fun at the same time. How can I assist you today?`;
    } else if (lowerCaseWords.includes("what's your name")) {
      return 'My name is Souso, your virtual assistant!';
    } else if (lowerCaseWords.includes('time')) {
      return `The current time is ${new Date().toLocaleTimeString()}.`;
    } else if (lowerCaseWords.includes('test')) {
      return 'Our mission is to provide an engaging and fun learning experience through various quiz categories. We believe quizzes can be an effective way to test your knowledge and have fun at the same time.';
    } else {
      return 'I didn’t catch that. Can you repeat?';
    }
  }
}
