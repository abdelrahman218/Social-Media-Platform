// src/app/admin-dashboard/admin-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { dummyUsers } from '../user/dummy-users';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../app.model';

interface ExtendedUser extends User {
  posts: number;
  reacts: number;
  banned?: boolean;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './adminn-dashboard.component.html',
    imports: [CommonModule, FormsModule],
  styleUrls: ['./adminn-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  users: (User & { posts: number, reacts: number, banned?: boolean })[] = [];
  bannedUsers: (User & { posts: number, reacts: number })[] = [];

  insights = {
    totalUsers: 0,
    totalPosts: 0,
    totalReacts: 0
  };

  ngOnInit(): void {
    // Add simulated posts/reacts to each user
    this.users = dummyUsers.map(user => ({
      ...user,
      posts: this.getRandomInt(1, 20),
      reacts: this.getRandomInt(5, 100),
      banned: false
    }));

    this.calculateInsights();
  }

  banUser(email: string): void {
    const index = this.users.findIndex(u => u.email === email);
    if (index > -1) {
      const [banned] = this.users.splice(index, 1);
      this.bannedUsers.push(banned);
      this.calculateInsights();
    }
  }

  calculateInsights(): void {
    this.insights.totalUsers = this.users.length;
    this.insights.totalPosts = this.users.reduce((sum, u) => sum + u.posts, 0);
    this.insights.totalReacts = this.users.reduce((sum, u) => sum + u.reacts, 0);
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}


