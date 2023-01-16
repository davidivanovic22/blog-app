import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { BlogPagination } from '../../models/blog';
import { Category } from '../../models/category';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  data!: BlogPagination;
  category!: BlogPagination;
  constructor(private readonly publicService: PublicService) {}
  ngOnInit(): void {
    this.publicService.onArticlesLoaded.subscribe((data) => {
      if (data != null) this.data = data;
    });
    this.publicService.onCategoriesLoaded.subscribe((data) => {
      if (data != null) this.category = data;
    });
  }

  changePage(page: string) {
    this.publicService.getAllArticles(page).subscribe((data) => {
      this.data = data;
    });
  }
}
