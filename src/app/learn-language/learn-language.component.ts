// learn-language.component.ts
import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { GeminiService } from '../gemini.service';
import { isPlatformBrowser } from '@angular/common';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

@Component({
  selector: 'app-learnlanguage',
  templateUrl: './learn-language.component.html',
  styleUrls: ['./learn-language.component.css'],
})
export class LearnlanguageComponent implements OnInit, OnDestroy {
  private recognition: any; // Store recognition instance
  private spokenWords: string = ''; // Store spoken words for later use

  constructor(
    private geminiService: GeminiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.setupSpeechRecognition();
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId) && this.recognition) {
      this.recognition.onstart = () => {
        console.log('Speech Recognition started!');
      };
      this.recognition.onresult = (event: any) => {
        this.spokenWords = event.results[0][0].transcript;
        console.log('Spoken words are:', "answer in one line like my friend like a humain"+this.spokenWords);
        this.handleSpeechResponse(); // Automatically respond after recognition
      };
      this.recognition.onerror = (event: any) => {
        console.error('Speech Recognition error:', event.error);
      };
      this.recognition.onend = () => {
        console.log('Speech Recognition ended.');
      };
    }
  }

  ngOnDestroy() {
    if (this.recognition) {
      this.recognition.stop(); // Stop recognition on component destruction
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

  startRecognition() {
    if (this.recognition) {
      this.recognition.start();
    }
  }

  async handleSpeechResponse() {
    const response = await this.generateDynamicResponse(this.spokenWords);
    console.log('Response:', response);
    this.computerSpeech(response);
  }

  computerSpeech(words: string) {
    if (typeof window !== 'undefined') {
      const speech = new SpeechSynthesisUtterance(words);
      speech.lang = 'en-US';
      speech.pitch = 1;
      speech.volume = 1;
      speech.rate = 1;
      window.speechSynthesis.speak(speech);
    } else {
      console.warn('Speech synthesis is not available in this environment.');
    }
  }

  async generateDynamicResponse(spokenWords: string): Promise<string> {
    try {
      const response = await this.geminiService.generateText(spokenWords);
      return response || "I'm sorry, I couldn't understand that. Could you please repeat?";
    } catch (error) {
      console.error('Error with Gemini service:', error);
      return 'There was an issue connecting to the Gemini service. Please try again later.';
    }
  }
}