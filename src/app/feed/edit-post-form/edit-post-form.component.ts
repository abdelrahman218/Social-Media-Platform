import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Post } from '../../app.model';
import { PostsService } from '../posts.service';
import { UserService } from '../../user/user.service';

interface ValidatorFn {
  (control: AbstractControl): ValidationErrors | null;
}

const isFormEmpty: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
  if (
    (formGroup.get('postTextContent')?.value as string) === '' &&
    (formGroup.get('images')?.value?.length === 0)
  ) {
    return { emptyPost: true };
  }
  return null;
};

@Component({
  selector: 'app-edit-post-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './edit-post-form.component.html',
  styleUrl: './edit-post-form.component.scss',
})
export class EditPostFormComponent {
  private postsService = inject(PostsService);
  private dialogRef = inject(MatDialogRef<EditPostFormComponent>);
  private userServices = inject(UserService);
  private postData = inject(MAT_DIALOG_DATA) as { post: Post };

  originalImageURLs: string[] = [];
  newPostFormGroup!: FormGroup;

  ngOnInit(): void {
    const post = this.postData.post;
    this.originalImageURLs = [...(post.attachedImagesURLs || [])];

    this.newPostFormGroup = new FormGroup(
      {
        postTextContent: new FormControl<string>(post.text_content),
        images: new FormControl<FileList | undefined>(undefined),
      },
      [isFormEmpty]
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onImagePicked(element: any): void {
    const files = element.files;
    this.newPostFormGroup.patchValue({ images: files });
  }

  addPost(): boolean {
    if (this.newPostFormGroup.invalid) {
      return false;
    }

    this.savePostLocally();
    return true;
  }

  private savePostLocally(): void {
    const postId = this.postData.post.id;
    const updatedTextContent = this.newPostFormGroup.value.postTextContent || '';
    const newImages = this.newPostFormGroup.value.images;
    const email= this.userServices.getCurrentUser()().email;
    this.postsService.editPost(postId, updatedTextContent, newImages,email).subscribe({
      next: () => {
        this.dialogRef.close({ success: true });
      },
      error: (error) => {
        console.error('Error editing post:', error);
      }
    });
  }
}