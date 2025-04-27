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
interface ValidatorFn {
  (control: AbstractControl): ValidationErrors | null;
}

const isFormEmpty: ValidatorFn = (
  formGroup: AbstractControl
): ValidationErrors | null => {
  if (
    (formGroup.get('postTextContent')?.value as string) === '' &&
    (formGroup.get('images')?.value as File[]).length === 0
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
  private dialogRef = inject(MatDialogRef<NewPostFormComponent>);
  readonly newPostFormGroup = new FormGroup(
    {
      postTextContent: new FormControl<string>(''),
      images: new FormControl<File[]>([]),
    },
    [isFormEmpty]
  );

  addPost(): boolean {
    if (this.newPostFormGroup.invalid) {
      return false;
    }

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
