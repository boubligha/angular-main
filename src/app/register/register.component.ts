import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {  OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule,CommonModule],
  standalone: true
})
export class RegisterComponent {
navigateToLogin() {
    this.router.navigate(['/log']);}
  registerData = { username: '', password: '' };
  isConfirmed: boolean = false;
  private recognition: any; // Speech recognition instance
    firstName: string = '';
  lastName: string = '';
  email: string = '';
  gender: string = '';
  password: string = '';
  confirmPassword: string = '';
  constructor(private authService: AuthService, private router: Router ,@Inject(PLATFORM_ID) private platformId: Object) {this.setupSpeechRecognition();
  }

  async onRegister() {
    try {
      const response = await this.authService.register(this.registerData.username, this.registerData.password);
      console.log('Inscription réussie:', response);
      alert('Inscription réussie. Vous pouvez maintenant vous connecter.');
      this.router.navigate(['/login']); // Redirection vers la page de connexion
    } catch (error: any) {
      console.error('Erreur d\'inscription:', error);
      alert('Erreur lors de l\'inscription. Veuillez réessayer.');
    }
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId) && this.recognition) {
      this.recognition.onstart = () => {
        console.log("Speech Recognition started!");
      };
      this.recognition.onresult = (event: any) => {
        const spokenWords = event.results[0][0].transcript;
        console.log("Spoken words are:", spokenWords);
        this.handleSpeechResponse(spokenWords); // Automatically respond after recognition
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

  register() {
    if (this.validateForm()) {
      console.log("Registration successful!");
      this.computerSpeech("Registration successful!");
    }
  }

  validateForm(): boolean {
    if (!this.firstName || !this.lastName) {
      this.computerSpeech("First name and last name are required.");
      return false;
    }
    if (!this.email || !/\S+@\S+\.\S+/.test(this.email)) {
      this.computerSpeech("A valid email is required.");
      return false;
    }
    if (!this.gender) {
      this.computerSpeech("Gender selection is required.");
      return false;
    }
    if (this.password.length < 6) {
      this.computerSpeech("Password must be at least 6 characters long.");
      return false;
    }
    if (this.password !== this.confirmPassword) {
      this.computerSpeech("Passwords do not match.");
      return false;
    }
    if (!this.isConfirmed) {
      this.computerSpeech("You must confirm your registration.");
      return false;
    }
    return true;
  }

  handleSpeechResponse(spokenWords: string) {
    const response = this.generateDynamicResponse(spokenWords);
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
      return "Hello! Welcome to the registration page. Let me know if you need help with the form.";
    } else if (lowerCaseWords.includes("help")) {
      return "To register, please fill in all fields including name, email, gender, password, and confirmation.";
    } else {
      return "I'm here to help! Please make sure to fill out all required fields.";
    }
  }
}

