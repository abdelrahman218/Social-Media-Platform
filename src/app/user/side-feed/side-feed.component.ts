import { Component,input } from '@angular/core';
import { User } from '../../app.model';
import {RouterLink, Router} from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-side-feed',
  imports: [RouterLink],
  templateUrl: './side-feed.component.html',
  styleUrl: './side-feed.component.scss'
})
export class SideFeedComponent {
user = input.required<User>();
constructor(private router: Router, private userService: UserService) {}
logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.userService.setCurrentUser(null);
  this.router.navigate(['/']);
}
}
