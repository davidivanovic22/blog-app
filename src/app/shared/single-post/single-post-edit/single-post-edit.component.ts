import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { expand, EMPTY, Observable } from 'rxjs';
import { Article } from '../../../models/article';
import { Category } from '../../../models/category';
import { AdminService } from '../../../services/admin.service';
import { PublicService } from '../../../services/public.service';

@Component({
  selector: 'app-single-post-edit',
  templateUrl: './single-post-edit.component.html',
  styleUrls: ['./single-post-edit.component.scss'],
})
export class SinglePostEditComponent implements OnInit {
  article!: Article;
  form = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    title: new UntypedFormControl(null, [
      Validators.required,
      Validators.maxLength(255),
    ]),
    body: new UntypedFormControl(null, [
      Validators.required,
      Validators.maxLength(1000),
    ]),
    category_id: new UntypedFormControl(null, Validators.required),
  });
  loading = false;
  categories: Article[] | Category[] = [];

  constructor(
    private dialogRef: MatDialogRef<SinglePostEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly adminService: AdminService,
    private readonly publicService: PublicService
  ) {
    
    if (data) {
      this.article = data;
      this.form.get('id')?.setValue(this.article.id);
      this.form.get('title')?.setValue(this.article.title);
      this.form.get('body')?.setValue(this.article.body);
      this.form.get('category_id')?.setValue(this.article.category_id);
    }
  }

  ngOnInit(): void {
    this.publicService.getAllCategoriesFromPagination().subscribe((data) => {
      if (data != null) {
        const categories = data.data;
        categories.map((category: any) => {
          if (!this.categories.push(category)) {
            this.categories.push(category);
          }
        });
        console.log(this.categories);
        
      }
    });
  }

  getAllArticles() {
    this.publicService
      .getAllArticles(localStorage.getItem('page')?.toString())
      .subscribe((data) => {
        this.publicService.onArticlesChange(data);
      });
  }

  close() {
    this.dialogRef.close(true);
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    const form = this.form.value;

    this.loading = true;

    if (form.id) {
      this.adminService.editPost(form).subscribe(
        () => {
          this.getAllArticles();
          this.close();
        },
        (err) => {
          this.getAllArticles();
          this.close();
        }
      );
    } else {
      this.adminService.addPost(form).subscribe(
        () => {
          this.getAllArticles();
          this.close();
        },
        (err) => {
          this.getAllArticles();
          this.close();
        }
      );
    }
  }
}
