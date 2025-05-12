import { Component } from '@angular/core';
import { DUMMY_ADMINS } from './dummy-admins';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class SuperAdminDashboardComponent {
  admins: string[] = [...DUMMY_ADMINS];
  newAdminName: string = '';
  showAddForm: boolean = false;

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    this.newAdminName = '';
  }

  addAdmin() {
    if (this.newAdminName.trim()) {
      this.admins.push(this.newAdminName.trim());
      this.newAdminName = '';
      this.showAddForm = false;
    }
  }

  deleteAdmin(index: number) {
    const adminName = this.admins[index];
    const confirmed = confirm(`Are you sure you want to delete "${adminName}"?`);
    if (confirmed) {
      this.admins.splice(index, 1);
    }
  }
}
