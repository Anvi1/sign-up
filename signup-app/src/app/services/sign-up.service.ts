import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private apiUrl = 'https://demo-api.now.sh/users';

  constructor(private http: HttpClient) { }

  createUser(userData: any) {
    return this.http.post(this.apiUrl, userData);
  }
  
}
