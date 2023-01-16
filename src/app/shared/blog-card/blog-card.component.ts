import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Article } from '../../models/article';
import { BlogPagination } from '../../models/blog';
import { Category } from '../../models/category';
import { AdminService } from '../../services/admin.service';
import { PublicService } from '../../services/public.service';
import { categoryRender } from '../../utils/utilility';
import {
  ConfirmationDialogComponent,
  ConfirmDialogModel,
} from '../confirmation-dialog/confirmation-dialog.component';
import { SinglePostEditComponent } from '../single-post/single-post-edit/single-post-edit.component';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
})
export class BlogCardComponent implements OnInit {
  @Input()
  article!: BlogPagination;
  categories: Article[] | Category[] = [];

  constructor(
    private readonly publicService: PublicService,
    private readonly adminService: AdminService,
    public router: Router,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.publicService.getAllCategoriesFromPagination().subscribe((data) => {
      if (data != null) {
        const categories = data.data;
        categories.map((category: any) => {
          if (!this.categories.push(category)) {
            this.categories.push(category);
          }
        });
      }
    });
  }

  category(categories: Category[], categoryId: number, property: string) {
    return categoryRender(categories, categoryId, property);
  }

  openDialog(article: Article) {
    this.dialog.open(SinglePostEditComponent, {
      data: article,
      panelClass: 'nopadding-dialog',
      width: '90%',
    });
  }

  getAllArticles() {
    this.publicService.getAllArticles().subscribe((data) => {
      this.publicService.onArticlesChange(data);
    });
  }

  deletePost(id: number) {
    const message = `Are you sure you want delete post?`;

    const dialogData = new ConfirmDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: 'auto',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.adminService.deletePost(id).subscribe(() => {
          this.getAllArticles();
          localStorage.removeItem('page');
        });
      }
    });
  }
}
