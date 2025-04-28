import { Component, input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Comment } from '../../../../app.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment',
  imports: [MatCardModule, MatButtonModule, MatIconModule, DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  comment=input.required<Comment>();

  get imgUrl(){
    return this.comment().user.profilePicURL;
  }
}
