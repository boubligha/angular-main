import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {OnInit, Inject, PLATFORM_ID, OnDestroy ,ViewEncapsulation} from '@angular/core';
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
export class LoginComponent {
  loginData = { username: '', password: '' };
  private recognition: any; // Store recognition instance
  private spokenWords: string = ''; // Store spoken words for later use

  constructor(private authService: AuthService, private router: Router ,@Inject(PLATFORM_ID) private platformId: Object) {this.setupSpeechRecognition();}
  ngOnInit() {
    if (isPlatformBrowser(this.platformId) && this.recognition) {
      // Initialize recognition only if in the browser and SpeechRecognition is available
      this.recognition.onstart = () => {
        console.log("Speech Recognition started!");
      };
      this.recognition.onresult = (event: any) => {
        this.spokenWords = event.results[0][0].transcript;
        console.log("Spoken words are:", this.spokenWords);
        this.handleSpeechResponse(); // Automatically respond after recognition
      };
      this.recognition.onerror = (event: any) => {
        console.error('Speech Recognition error:', event.error);
      };
      this.recognition.onend = () => {
        console.log("Speech Recognition ended.");
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

  handleSpeechResponse() {
    const response = this.generateDynamicResponse(this.spokenWords);
    console.log("Response:", response);
    this.computerSpeech(response);
  }

  computerSpeech(words: string) {
    if (typeof window !== 'undefined') {
      const speech = new SpeechSynthesisUtterance(words);
      speech.lang = "en-US";
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
    if (lowerCaseWords.includes("hello") || lowerCaseWords.includes("hi")) {
      return "Hello! Welcome to the Quiz App. Here, you can test your languages (French, English...) and scientific subjects like Mathematics and more. How can I assist you today?";
    } else if (lowerCaseWords.includes("what's your name")) {
      return "My name is Souso, and I am your virtual assistant here to help you!";
    } else if (lowerCaseWords.includes("what can you do")) {
      return "I can answer your questions and assist you with various tasks. Instead of clicking buttons every time, you can call me to do it for you.";
    } else if (lowerCaseWords.includes("what time is it please")) {
      return "The current time is ${new Date().toLocaleTimeString()}";
    } else if (lowerCaseWords.includes("weather")) {
      return "I'm unable to check the weather, but you can use a weather app for that.";
    } else {
      return "That's interesting! Can you tell me more?";
    }
  }

  async onLogin() {
    try {
      const response = await this.authService.login(this.loginData.username, this.loginData.password);
      console.log('Connexion réussie:', response);
      this.router.navigate(['/secret']); // Redirection vers la page secrète
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      alert('Échec de la connexion. Veuillez vérifier vos identifiants.');
    }
  }
 
}

