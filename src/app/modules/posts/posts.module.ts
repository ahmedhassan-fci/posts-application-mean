import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreatePostComponent, PostsListComponent } from './containers';
import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CreatePostComponent, PostsListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PostsRoutingModule,
    SharedModule,
  ],
})
export class PostsModule {}
