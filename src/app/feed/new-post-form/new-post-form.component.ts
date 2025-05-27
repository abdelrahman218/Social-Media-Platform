import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Post } from '../../app.model';
import { PostsService } from '../posts.service';
import { UserService } from '../../user/user.service';
interface ValidatorFn {
  (control: AbstractControl): ValidationErrors | null;
}

const isFormEmpty: ValidatorFn = (
  formGroup: AbstractControl
): ValidationErrors | null => {
  if (
    (formGroup.get('postTextContent')?.value as string) === '' &&
    (formGroup.get('images')?.value?.length === 0)
  ) {
    const error = {
      emptyPost: true,
    };
    return error;
  }

  return null;
};

@Component({
  selector: 'app-new-post-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './new-post-form.component.html',
  styleUrl: './new-post-form.component.scss',
})
export class NewPostFormComponent {
  private postsService=inject(PostsService);
  private dialogRef = inject(MatDialogRef<NewPostFormComponent>);
  private userServices= inject(UserService);
  readonly newPostFormGroup = new FormGroup(
    {
      postTextContent: new FormControl<string>(''),
      images: new FormControl<FileList | undefined>(undefined),
    },
    [isFormEmpty]
  );

  private savePostLocally(){
    //Mapping Files in its names
    const imagesURLs=[];
    for(let i=0; i<(this.newPostFormGroup.value.images?.length || 0); i++){
      imagesURLs.push(this.newPostFormGroup.value.images?.item(i)?.name || "");
    }

    const newPost: Post ={
      id: 0,
      text_content: this.newPostFormGroup.value.postTextContent || "",
      postOwner: {
        profilePicURL: this.userServices.getCurrentUser()().profilePicURL,
        name: this.userServices.getCurrentUser()().name,
        email: this.userServices.getCurrentUser()().email,
      },
      datePosted: new Date(),
      attachedImagesURLs:  imagesURLs || [],
      likes: [],
      comments: []
    }

    this.postsService.addPost(newPost, this.newPostFormGroup.value.images);
  }
  addPost(): boolean {
    if (this.newPostFormGroup.invalid) {
      return false;
    }

    this.savePostLocally();
    this.newPostFormGroup.reset();
    this.onCancel();
    return true;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onImagePicked(element: any) {
    const files = element.files;
    this.newPostFormGroup.patchValue({ images: files });
  }
}
