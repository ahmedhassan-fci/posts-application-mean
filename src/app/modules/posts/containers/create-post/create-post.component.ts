import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService, mimeType } from 'src/app/core';
import { AlertNotificationService } from 'src/app/shared';

@Component({
  selector: 'posts-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit, OnDestroy {
  postForm!: FormGroup;
  isLoading = false;
  isEditPost = false;
  imagePreview: any;
  postId!: string;

  getPost$!: Subscription;
  addPost$!: Subscription;

  constructor(
    private _fb: FormBuilder,
    public _postsService: PostsService,
    public _route: ActivatedRoute,
    private _alertNotificationService: AlertNotificationService
  ) {}

  ngOnInit() {
    this.postForm = this._fb.group({
      title: [null, [Validators.required, Validators.minLength(3)]],
      content: [null, [Validators.required]],
      image: [null, Validators.required, mimeType],
    });

    this._route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.isLoading = true;
        this.isEditPost = true;
        this.postId = paramMap.get('id') || '';
        this.getPost$ = this._postsService
          .getPost(this.postId)
          .subscribe((postData) => {
            this.isLoading = false;
            this.postForm?.setValue({
              title: postData?.title,
              content: postData?.content,
              image: postData?.imagePath,
            });
            this.imagePreview = postData?.imagePath;
          });
      } else {
        this.isEditPost = false;
      }
    });
  }

  get title(): AbstractControl | null {
    return this.postForm?.get('title');
  }

  get content(): AbstractControl | null {
    return this.postForm?.get('content');
  }

  get image(): AbstractControl | null {
    return this.postForm?.get('image');
  }

  onImagePicked(event: any) {
    if (event.target && event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.image?.setValue(file);
      this.image?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSavePost(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const value = form.value;
    if (this.isEditPost) {
      this.addPost$ = this._postsService
        .updatePost({ ...value, id: this.postId })
        .subscribe(
          (response) => {
            this.isLoading = false;
            this.postForm.reset();
            this.imagePreview = null;
            this._alertNotificationService.success(response.message);
          },
          (error) => {
            this.isLoading = false;
            this._alertNotificationService.error(error.error.message);
          }
        );
    } else {
      this.addPost$ = this._postsService.addPost(value).subscribe(
        (response) => {
          this.isLoading = false;
          this.postForm.reset();
          this.imagePreview = null;
          this._alertNotificationService.success(response.message);
        },
        (error) => {
          this.isLoading = false;
          this._alertNotificationService.error(error.error.message);
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.getPost$) this.getPost$.unsubscribe();
    if (this.addPost$) this.addPost$.unsubscribe();
  }
}
