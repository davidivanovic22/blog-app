import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BlogPagination } from '../../../models/blog';
import { Category } from '../../../models/category';
import { AdminService } from '../../../services/admin.service';
import { PublicService } from '../../../services/public.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  category!: BlogPagination;
  dataSource = new MatTableDataSource<Category>([]);
  constructor(
    private publicService: PublicService,
    private adminService: AdminService,
    private dialog: MatDialog
  ) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  getAllCategories() {
    this.publicService.onCategoriesLoaded.subscribe((data) => {
      if (data != null) this.category = data;
    });
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  changePage(page: string) {
    this.publicService.getAllCategories(page).subscribe((data) => {
      this.category = data;
    });
  }
}
