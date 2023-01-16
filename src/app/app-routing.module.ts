import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './core/admin/admin.component';
import { CategoryComponent } from './core/admin/category/category.component';
import { PublicComponent } from './core/public/public.component';
import { AuthGuard } from './guard/auth.guard';
import { SinglePostComponent } from './shared/single-post/single-post.component';

const routes: Routes = [
  { path: 'home', component: PublicComponent },
  { path: 'home/details/:id', component: SinglePostComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/category',
    component: CategoryComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
