import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private recognition: any;
  spokenWords: string = '';
  email: string = '';
  password: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    this.setupSpeechRecognition();
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId) && this.recognition) {
      this.recognition.onstart = () => console.log('Speech Recognition started!');
      this.recognition.onresult = (event: any) => {
        this.spokenWords = event.results[0][0].transcript;
        console.log('Spoken words are:', this.spokenWords);
        this.handleSpeechResponse();
      };
      this.recognition.onerror = (event: any) => console.error('Speech Recognition error:', event.error);
      this.recognition.onend = () => console.log('Speech Recognition ended.');
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

  startRecognition() {
    if (this.recognition) {
      this.recognition.start();
    }
  }

  handleSpeechResponse() {
    const response = this.generateDynamicResponse(this.spokenWords);
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

  generateDynamicResponse(spokenWords: string): string {
    const lowerCaseWords = spokenWords.toLowerCase();
    if (lowerCaseWords.includes('hello') || lowerCaseWords.includes('hi')) {
      return 'Hello! Welcome to the Quiz App. How can I assist you today?';
    } else if (lowerCaseWords.includes("what's your name")) {
      return 'My name is Souso, your virtual assistant!';
    } else if (lowerCaseWords.includes('time')) {
      return `The current time is ${new Date().toLocaleTimeString()}.`;
    } else {
      return 'I didn’t catch that. Can you repeat?';
    }
  }

  navigateToRegister() {
    this.router.navigate(['register']);
  }
  navigateToPrincipal() {
    this.router.navigate(['secret']);
  }

  onSubmit() {
    let errorMessage = '';

    if (!this.isValidEmail(this.email)) {
      errorMessage = 'Invalid email. Please enter a valid email address.';
    } else if (this.password.length < 8) {
      errorMessage = 'Invalid password. Please enter at least 8 characters.';
    }
    if (errorMessage) {
      console.error(errorMessage);
      this.computerSpeech(errorMessage);
    } else {
      console.log('Form submitted successfully:', { email: this.email, password: this.password });
      this.navigateToPrincipal();
    }
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
}
