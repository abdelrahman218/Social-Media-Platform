import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Comment, Post } from '../../../app.model';
import { PostsService } from '../../posts.service';
import { CommentComponent } from "./comment/comment.component";
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-comments-section',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    CommentComponent
],
  templateUrl: './comments-section.component.html',
  styleUrl: './comments-section.component.scss',
})
export class CommentsSectionComponent {
  private postsService = inject(PostsService);
  private userService = inject(UserService);
  post = input.required<Post>();
  newComment: string = '';
  
  private submitComment(){
    const comment: Comment = {
      id: 0,
      text: this.newComment,
      user: {
        name: this.userService.getCurrentUser()()?.name ?? '',
        email: this.userService.getCurrentUser()()?.email ?? '',
        profilePicURL: this.userService.getCurrentUser()()?.profilePicURL ?? '',
      },
      dateCreated: new Date(),
    };
    this.postsService.addComment(this.post().id, comment);
    this.newComment = '';
  }

  addCommentKeyboard(event: KeyboardEvent) {
    if (event?.key === 'Enter' && this.newComment !== '') {
      this.submitComment();
    }
  }

  addCommentMouse() {
    if (this.newComment !== '') {
      this.submitComment();
    }
  }
}
