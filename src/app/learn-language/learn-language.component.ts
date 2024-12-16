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
  private fullConversation: string = ''; // Store the full conversation
  public conversationMessages: string[] = []; // Add this line for message history
  public userInput: string = ''; // Add this line for user input
  private selectedLanguage: string = 'en-US'; // Default language for speech synthesis and responses

  constructor(
    private geminiService: GeminiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.setupSpeechRecognition();
  }
//generateText
  ngOnInit() {
    if (isPlatformBrowser(this.platformId) && this.recognition) {
      this.recognition.onstart = () => {
        console.log('Speech Recognition started!');
      };
      this.recognition.onresult = (event: any) => {
        this.spokenWords = event.results[0][0].transcript;
        console.log('Spoken words are:', this.spokenWords);
        this.fullConversation += `User: ${this.spokenWords}\n`; // Add to conversation
        this.conversationMessages.push(`User: ${this.spokenWords}`); // Add to message history
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
      this.recognition.lang = this.selectedLanguage; // Set the default language
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
    this.fullConversation += `AI: ${response}\n`; // Add to conversation
    this.conversationMessages.push(`AI: ${response}`); // Add to message history
    this.computerSpeech(response);
  }

  computerSpeech(words: string) {
    if (typeof window !== 'undefined') {
      const speech = new SpeechSynthesisUtterance(words);
      speech.lang = this.selectedLanguage; // Use the selected language
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
      const response = await this.geminiService.generateText2(spokenWords, this.selectedLanguage);
      return response || "I'm sorry, I couldn't understand that. Could you please repeat?";
    } catch (error) {
      console.error('Error with Gemini service:', error);
      return 'There was an issue connecting to the Gemini service. Please try again later.';
    }
  }
  changeLanguage(str: string) {

    const languageMapping: { [key: string]: string } = {
      'fr': 'fr-FR',  // French
      'en': 'en-US',  // English
      'de': 'de-DE',  // German
      'ja': 'ja-JP',  // Japanese
      'tr': 'tr-TR',  // Turkish
    };
  
    this.selectedLanguage = languageMapping[str] || 'en-US'; // Default to English if not found
  
    if (this.recognition) {
      this.recognition.lang = this.selectedLanguage; // Set the language for speech recognition
      this.recognition.stop(); // Stop the current recognition
      this.recognition.start(); // Restart recognition with the new language
    }
  }

  displayConversation() {
    console.log('Full conversation:', this.fullConversation);
    alert(this.fullConversation);
  }

    // Add sendMessage method to handle text input
    async sendMessage2() {
      if (this.userInput.trim() !== '') {
        this.conversationMessages.push(`User: ${this.userInput}`); // Add to message history
        this.fullConversation += `User: ${this.userInput}\n`; // Add to conversation
        try {
          const response = await this.generateDynamicResponse(this.userInput);
          this.conversationMessages.push(`AI: ${response}`); // Add AI response to message history
          this.fullConversation += `AI: ${response}\n`; // Add AI response to conversation
        } catch (error) {
          console.error('Error handling user input:', error);
        }
        this.userInput = ''; // Clear the input after sending
      }
    }

  // Add sendMessage method to handle text input
  async sendMessage() {
    if (this.userInput.trim() !== '') {
      this.conversationMessages.push(`User: ${this.userInput}`); // Add to message history
      this.fullConversation += `User: ${this.userInput}\n`; // Add to conversation

      try {
        const response = await this.generateDynamicResponse(this.userInput);
        this.conversationMessages.push(`AI: ${response}`); // Add AI response to message history
        this.fullConversation += `AI: ${response}\n`; // Add AI response to conversation
        this.computerSpeech(response); // Have the AI speak the response
      } catch (error) {
        console.error('Error handling user input:', error);
      }
      
      this.userInput = ''; // Clear the input after sending
    }
  }
}
