import { Component,inject,input,Inject } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../app.model';
@Component({
  selector: 'app-side-feed',
  imports: [],
  templateUrl: './side-feed.component.html',
  styleUrl: './side-feed.component.scss'
})
export class SideFeedComponent {
private userService = inject(UserService);
user = input.required<User>();
currentUser=this.userService.getCurrentUser();
}
