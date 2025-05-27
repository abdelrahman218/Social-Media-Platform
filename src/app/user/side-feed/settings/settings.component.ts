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
  user: User = this.userService.getCurrentUser()();
  showPassword = false;
  showConfirmPassword = false;
  confirmPassword = this.user.password;

  saveChanges() {
    if (this.confirmPassword !== this.user.password) {
      alert('Passwords do not match!');
      return;
    }

    this.userService.updateUser(this.user.email, { ...this.user });
    alert('updated successfully');
  }
}
