import { Component, computed, inject, input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Post } from '../../app.model';
import { DatePipe } from '@angular/common';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post',
  imports: [MatCardModule, MatButtonModule, MatIconModule, DatePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  private postsService=inject(PostsService);
  post=input.required<Post>();
  isLikedByLoggedInUser=computed<boolean>(()=>(this.post().likes.find((like)=>like.userId===102)!==undefined));

  get imgUrl(){
    return this.post().postOwner.profilePicURL;
  }
  
  likePost(){
    this.postsService.likeOrUnlikePost(this.post().id);
  }
}
