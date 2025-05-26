import { Component, computed, inject, input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CarouselComponent, CarouselControlComponent, CarouselIndicatorsComponent, CarouselInnerComponent, CarouselItemComponent } from '@coreui/angular';
import { Post } from '../../app.model';
import { DatePipe } from '@angular/common';
import { PostsService } from '../posts.service';
import { CommentsSectionComponent } from './comments-section/comments-section.component';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-post',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
    CommentsSectionComponent,
    CarouselComponent,
    CarouselIndicatorsComponent,
    CarouselInnerComponent,
    CarouselItemComponent,
    CarouselControlComponent,
    RouterLink,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  private postsService = inject(PostsService);
  private userService = inject(UserService);
  post = input.required<Post>();
  isLikedByLoggedInUser = computed<boolean>(
    () => this.post().likes.find((like) => like.user.email === this.userService.getCurrentUser()().email) !== undefined
  );
  isCommentsOpen = signal<boolean>(false);
  get imgUrl() {
    return this.post().postOwner.profilePicURL;
  }

  likePost() {
    if (this.isLikedByLoggedInUser()) {
      this.postsService.unlikePost(this.post().id);
    } else {
      this.postsService.likePost(this.post().id);
    }
  }

  toggleCommentsSection() {
    this.isCommentsOpen.update((oldValue) => !oldValue);
  }
}
