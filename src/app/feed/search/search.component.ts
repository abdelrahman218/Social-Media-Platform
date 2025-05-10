import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  query: string = '';
  users = [
    { name: 'Alex Johnson' },
    { name: 'Emma Smith' },
    { name: 'John Doe' },
    { name: 'Sophia Lee' }
  ];
  filteredUsers: any[] = [];

  onSearch() {
    const lower = this.query.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(lower)
    );
  }

  selectUser(user: any) {
    this.query = user.name;
    this.filteredUsers = [];
    // You can emit an event here if needed
  }
}
