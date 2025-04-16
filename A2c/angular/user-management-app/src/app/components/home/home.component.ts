import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <h1>Welcome to User Management</h1>
      <div class="button-container">
        <button (click)="navigateTo('/login')" class="action-button login">Login</button>
        <button (click)="navigateTo('/register')" class="action-button register">Register</button>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 80vh;
      text-align: center;
    }

    h1 {
      color: #333;
      margin-bottom: 2rem;
      font-size: 2.5rem;
    }

    .button-container {
      display: flex;
      gap: 1rem;
    }

    .action-button {
      padding: 1rem 2rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1.1rem;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .action-button.login {
      background-color: #007bff;
      color: white;
    }

    .action-button.register {
      background-color: #28a745;
      color: white;
    }

    .action-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .action-button.login:hover {
      background-color: #0056b3;
    }

    .action-button.register:hover {
      background-color: #218838;
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
} 