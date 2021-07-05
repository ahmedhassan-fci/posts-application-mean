import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core';
import { CreatePostComponent, PostsListComponent } from './containers';

const routes: Routes = [
  { path: '', component: PostsListComponent },
  {
    path: 'create-post',
    canActivate: [AuthGuard],
    component: CreatePostComponent,
  },
  {
    path: 'edit-post/:id',
    canActivate: [AuthGuard],
    component: CreatePostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class PostsRoutingModule {}
