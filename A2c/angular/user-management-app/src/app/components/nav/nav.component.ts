import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="nav-container">
      <div class="nav-buttons">
        <ng-container *ngIf="!isLoggedIn">
          <button (click)="navigateTo('/login')" class="nav-button">Login</button>
          <button (click)="navigateTo('/register')" class="nav-button">Register</button>
        </ng-container>
        <ng-container *ngIf="isLoggedIn">
          <button (click)="navigateTo('/profile')" class="nav-button">Profile</button>
          <button (click)="logout()" class="nav-button logout">Logout</button>
        </ng-container>
      </div>
    </nav>
  `,
  styles: [`
    .nav-container {
      background-color: #f8f9fa;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .nav-buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }
    .nav-button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      background-color: #007bff;
      color: white;
      transition: background-color 0.3s;
    }
    .nav-button:hover {
      background-color: #0056b3;
    }
    .nav-button.logout {
      background-color: #dc3545;
    }
    .nav-button.logout:hover {
      background-color: #c82333;
    }
  `]
})
export class NavComponent {
  constructor(private router: Router, private authService: AuthService) {}

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 