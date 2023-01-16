import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from '../../../../models/article';
import { Category } from '../../../../models/category';
import { AdminService } from '../../../../services/admin.service';
import { PublicService } from '../../../../services/public.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
})
export class CategoryDialogComponent implements OnInit {
  category!: Category;
  form = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    name: new UntypedFormControl(null, [
      Validators.required,
      Validators.maxLength(255),
    ]),
    description: new UntypedFormControl(null, [
      Validators.required,
      Validators.maxLength(512),
    ]),
  });
  loading = false;
  categories: Article[] | Category[] = [];

  constructor(
    private dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly adminService: AdminService,
    private readonly publicService: PublicService
  ) {
    if (data) {
      console.log(data);

      this.category = data;
      this.form.get('id')?.setValue(this.category.id);
      this.form.get('name')?.setValue(this.category.name);
      this.form.get('description')?.setValue(this.category.description);
    }
  }

  ngOnInit(): void {
    this.onCategoriesChange();
  }

  onCategoriesChange() {
    this.publicService.onCategoriesLoaded.subscribe((data) => {
      if (data != null) this.categories = data.data;
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
      this.adminService.editCategory(form).subscribe(
        () => {
          this.close();
        },
        (err) => {
          this.close();
        }
      );
    } else {
      this.adminService.addCategory(form).subscribe(
        () => {
          this.close();
        },
        (err) => {
          this.close();
        }
      );
    }
  }
}
