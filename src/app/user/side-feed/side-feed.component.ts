import { Component,input } from '@angular/core';
import { User } from '../../app.model';
import {RouterLink, Router} from '@angular/router';
@Component({
  selector: 'app-side-feed',
  imports: [RouterLink],
  templateUrl: './side-feed.component.html',
  styleUrl: './side-feed.component.scss'
})
export class SideFeedComponent {
user = input.required<User>();
constructor(private router: Router) {}
logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.router.navigate(['/']);
}
}
