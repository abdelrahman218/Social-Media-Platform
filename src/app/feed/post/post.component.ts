import { Component, computed, input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Post } from '../../app.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post',
  imports: [MatCardModule, MatButtonModule, MatIconModule, DatePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  post=input.required<Post>();
  isLikedByLoggedInUser=computed<boolean>(()=>(this.post().likes.find((like)=>like.userId===102)!==undefined));

  get imgUrl(){
    return this.post().postOwner.profilePicURL;
  }

  get altImg(){
    return (this.post().postOwner.gender==='Male')? 'default-male-avatar' : 'default-female-avatar';
  }
}
