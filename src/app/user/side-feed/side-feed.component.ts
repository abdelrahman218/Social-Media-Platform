import { Component,inject,input,Inject } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../app.model';
import {RouterLink} from '@angular/router';
@Component({
  selector: 'app-side-feed',
  imports: [RouterLink],
  templateUrl: './side-feed.component.html',
  styleUrl: './side-feed.component.scss'
})
export class SideFeedComponent {
user = input.required<User>();
}
