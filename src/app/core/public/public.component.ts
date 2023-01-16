import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPagination } from '../../models/blog';
import { Category } from '../../models/category';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
})
export class PublicComponent implements OnInit {
  data!: BlogPagination;
  categories: Category[] = [];
  constructor(
    private readonly publicService: PublicService,
    private readonly route: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.publicService.onArticlesLoaded.subscribe((data) => {
      if (data != null) this.data = data;
    });
  }

  changePage(page: string) {
    this.publicService.getAllArticles(page).subscribe((data) => {
      this.data = data;
    });
  }
}
