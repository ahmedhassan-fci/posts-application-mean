import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { generalConstants } from 'src/app/config';
import { AuthService, IPost, PostsService } from 'src/app/core';
import { AlertNotificationService } from 'src/app/shared';

@Component({
  selector: 'posts-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit, OnDestroy {
  posts: IPost[] = [];
  isLoading = false;
  postsSub$!: Subscription;
  deletePost$!: Subscription;

  defaultPostImg = generalConstants.defaultPostPath;

  constructor(
    public _postsService: PostsService,
    public authService: AuthService,
    private _alertNotificationService: AlertNotificationService
  ) {}

  ngOnInit() {
    if (this.authService.getIsAuth()) {
      this.isLoading = true;
      this.postsSub$ = this._postsService.getPosts().subscribe(
        (response) => {
          this.isLoading = false;
          this.posts = response.posts;
        },
        (error) => {
          this.isLoading = false;
          this._alertNotificationService.error('Error in fetching posts');
        }
      );
    }
  }

  onDelete(postId: string) {
    this.deletePost$ = this._postsService.deletePost(postId).subscribe(
      (response) => {
        this._alertNotificationService.success(response.message);
        this.posts.forEach((post, index) => {
          if (post?.id === postId) {
            this.posts.splice(index, 1);
          }
        });
      },
      () => {
        this._alertNotificationService.error('Error in fetching posts');
      }
    );
  }

  ngOnDestroy() {
    if (this.postsSub$) this.postsSub$.unsubscribe();
    if (this.deletePost$) this.deletePost$.unsubscribe();
  }
}
