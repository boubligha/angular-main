import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api';
  private axiosInstance: AxiosInstance;
  private userSubject = new BehaviorSubject<any>({}); // Subject to store user information

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      withCredentials: true, // Include cookies in requests (if applicable on server-side)
    });
  }

  // API for registration
  async register(username: string, password: string): Promise<any> {
    try {
      const response = await this.axiosInstance.post('/register', { username, password });
      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  // API for login
  async login(username: string, password: string): Promise<any> {
    try {
      const response = await this.axiosInstance.post('/login', { username, password });

      const token = response.data?.token;
      if (token) {
        this.saveToken(token);
        console.log('Token saved:', token);
        const userData = response.data?.user; // Extract user data from response (if available)
        this.setUser(userData); // Update user subject with retrieved data
      } else {
        console.warn('No token received in login response.');
      }

      console.log('reponse:', response.data);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  // API for logout
  async logout(): Promise<any> {
    try {
      const response = await this.axiosInstance.post('/logout');
      this.removeToken(); // Remove token after logout
      this.setUser({}); // Reset user subject to empty state
      console.log('Logout successful');
      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  // API to access the secret page
  async getSecret(): Promise<any> {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error('Token missing');
      }

      console.log('Token retrieved:', token); // Debug token

      const response = await this.axiosInstance.get('/secret', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  // Save token in secure storage (consider HttpOnly cookies)
  private saveToken(token: string): void {
    // ... (Implement token storage using localStorage or a secure mechanism)
  }

  // Retrieve token from secure storage
  private getToken():  any {
    // ... (Implement token retrieval from secure storage)
  }

  // Remove token from secure storage
  private removeToken(): void {
    // ... (Implement token removal from secure storage)
  }

  // Check if we're in a browser environment
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  // Handle errors from API calls
  private handleError(error: any): void {
    // ... (error handling logic from previous responses)
  }

  // Set user information in internal user subject
  private setUser(userData: any): void {
    this.userSubject.next(userData); // Emit updated user data through the subject
  }

  // Get user information as an observable stream
  getUser(): BehaviorSubject<any> {
    return this.userSubject;
  }
}