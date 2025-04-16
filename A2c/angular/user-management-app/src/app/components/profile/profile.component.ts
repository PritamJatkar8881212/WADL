import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  error: string | null = null;
  loading = true;
  isEditing = false;
  updateForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.updateForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        if (user) {
          this.updateForm.patchValue({
            username: user.username,
            email: user.email
          });
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load user profile';
        this.loading = false;
        console.error('Error loading profile:', err);
      }
    });
  }

  startEditing() {
    this.isEditing = true;
  }

  cancelEditing() {
    this.isEditing = false;
    if (this.user) {
      this.updateForm.patchValue({
        username: this.user.username,
        email: this.user.email,
        password: ''
      });
    }
  }

  onSubmit() {
    if (this.updateForm.valid && this.user) {
      const updatedUser = {
        ...this.user,
        username: this.updateForm.value.username,
        email: this.updateForm.value.email
      };

      // Only update password if it's provided
      if (this.updateForm.value.password) {
        updatedUser.password = this.updateForm.value.password;
      }

      this.authService.updateUser(updatedUser).subscribe({
        next: (success) => {
          if (success) {
            this.user = updatedUser;
            this.isEditing = false;
            this.error = null;
          } else {
            this.error = 'Failed to update profile';
          }
        },
        error: (err) => {
          this.error = 'Failed to update profile';
          console.error('Error updating profile:', err);
        }
      });
    }
  }
}
