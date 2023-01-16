import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './core/admin/admin.component';
import { CategoryCardComponent } from './core/admin/category/category-card/category-card.component';
import { CategoryDialogComponent } from './core/admin/category/category-dialog/category-dialog.component';
import { CategoryComponent } from './core/admin/category/category.component';
import { LoginComponent } from './core/login/login.component';
import { PublicComponent } from './core/public/public.component';
import { DayAgoPipe } from './pipes/day-ago.pipe';
import { PaginationClearPipe } from './pipes/pagination-clear.pipe';
import { SplitStringPipe } from './pipes/split-string.pipe';
import { BlogCardComponent } from './shared/blog-card/blog-card.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { SinglePostEditComponent } from './shared/single-post/single-post-edit/single-post-edit.component';
import { SinglePostComponent } from './shared/single-post/single-post.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    PublicComponent,
    BlogCardComponent,
    PaginationComponent,
    SplitStringPipe,
    NavigationComponent,
    SinglePostComponent,
    LoginComponent,
    CategoryComponent,
    SinglePostEditComponent,
    CategoryDialogComponent,
    CategoryCardComponent,
    ConfirmationDialogComponent,
    DayAgoPipe,
    PaginationClearPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatProgressBarModule,
    MatDividerModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
