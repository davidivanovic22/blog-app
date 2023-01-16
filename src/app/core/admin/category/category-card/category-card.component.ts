import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BlogPagination } from '../../../../models/blog';
import { Category } from '../../../../models/category';
import { AdminService } from '../../../../services/admin.service';
import { PublicService } from '../../../../services/public.service';
import { ConfirmationDialogComponent, ConfirmDialogModel } from '../../../../shared/confirmation-dialog/confirmation-dialog.component';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent implements OnInit {
  @Input()
  category!: BlogPagination;

  constructor(
    private readonly publicService: PublicService,
    private readonly adminService: AdminService,
    public router: Router,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  getAllCategories() {
    this.publicService.getAllCategories().subscribe((data) => {
      this.publicService.onCategoriesChange(data);
    });
  }

  deleteCategory(id: number) {
    const message = `Are you sure you want delete category?`;

    const dialogData = new ConfirmDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: 'auto',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.adminService.deleteCategory(id).subscribe(() => {
          this.getAllCategories();
        });
      }
    });
  }

  openDialog(category?: Category) {
    this.dialog
      .open(CategoryDialogComponent, {
        data: category,
        panelClass: 'nopadding-dialog',
        width: '90%',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.getAllCategories();
        }
      });
  }
}
