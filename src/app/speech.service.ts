import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  private recognition: any;
  spokenWords: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.setupSpeechRecognition();
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

  startRecognition(callback: (words: string) => void) {
    if (this.recognition) {
      this.recognition.onresult = (event: any) => {
        this.spokenWords = event.results[0][0].transcript;
        callback(this.spokenWords);
      };
      this.recognition.start();
    }
  }

  computerSpeech(words: string) {
    if (typeof window !== 'undefined') {
      const speech = new SpeechSynthesisUtterance(words);
      speech.lang = 'en-US';
      window.speechSynthesis.speak(speech);
    }
  }
}
