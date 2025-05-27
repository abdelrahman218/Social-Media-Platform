import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../user.service';
import { User } from '../../../app.model';
import { SideFeedComponent } from '../side-feed.component';
@Component({
  selector: 'app-settings',
  imports: [FormsModule,SideFeedComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  private userService = inject(UserService);
  user: User | null = this.userService.getCurrentUser()();
  showPassword = false;
  showConfirmPassword = false;
  confirmPassword = this.user?.password;
  
  onProfilePicSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (this.user) {
          this.user.profilePicURL = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }
  saveChanges() {
    if (this.confirmPassword !== this.user?.password) {
      alert('Passwords do not match!');
      return;
    }

    if (this.user) {
      this.userService.updateUser(this.user.email, { ...this.user });
      alert('updated successfully');
    }
  }
}
