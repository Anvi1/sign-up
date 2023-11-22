import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDataType } from '../Interface/user-data';

/**
 * Service to handle sign up operations.
 */
@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  // URL of the user registration API endpoint
  private apiUrl = 'https://demo-api.now.sh/users';

  /**
   * Injecting the HttpClient service for making HTTP requests.
   * @param http The HTTP client for sending requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Method to create a new user.
   * This method sends a POST request to the API endpoint to create a new user.
   * 
   * @param userData The user data to be sent to the server.
   * @returns Observable of the HTTP POST request.
   */
  createUser(userData: UserDataType) {
    return this.http.post(this.apiUrl, userData);
  }
  
}
