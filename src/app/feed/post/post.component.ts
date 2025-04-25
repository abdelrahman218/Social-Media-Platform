import { Component, input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Post } from '../../app.model';

@Component({
  selector: 'app-post',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  post=input.required<Post>();

  get imgUrl(){
    return this.post().postOwner.profilePicURL;
  }
}
