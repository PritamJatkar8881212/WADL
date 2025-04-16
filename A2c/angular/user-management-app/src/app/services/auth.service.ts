import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];
  private currentUser = new BehaviorSubject<User | null>(null);

  constructor() {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    }
    
    // Check for current user in localStorage
    const currentUserData = localStorage.getItem('currentUser');
    if (currentUserData) {
      this.currentUser.next(JSON.parse(currentUserData));
    }
  }

  register(username: string, email: string, password: string): Observable<boolean> {
    if (this.users.some(user => user.email === email)) {
      return of(false);
    }

    const newUser: User = {
      id: this.users.length + 1,
      username,
      email,
      password
    };

    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));
    return of(true);
  }

  login(email: string, password: string): Observable<boolean> {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser.next(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return of(true);
    }
    return of(false);
  }

  logout(): void {
    this.currentUser.next(null);
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  isAuthenticated(): boolean {
    return this.currentUser.value !== null;
  }

  updateUser(updatedUser: Partial<User>): Observable<boolean> {
    const currentUser = this.currentUser.value;
    if (!currentUser) {
      return of(false);
    }

    // Update user in users array
    const userIndex = this.users.findIndex(u => u.id === currentUser.id);
    if (userIndex === -1) {
      return of(false);
    }

    const updatedUserData = {
      ...this.users[userIndex],
      ...updatedUser
    };

    this.users[userIndex] = updatedUserData;
    this.currentUser.next(updatedUserData);

    // Update localStorage
    localStorage.setItem('users', JSON.stringify(this.users));
    localStorage.setItem('currentUser', JSON.stringify(updatedUserData));

    return of(true);
  }
}
