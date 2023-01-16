import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../models/article';
import { BlogPagination } from '../../models/blog';
import { Category } from '../../models/category';
import { PublicService } from '../../services/public.service';
import { categoryRender } from '../../utils/utilility';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
})
export class SinglePostComponent implements OnInit, OnDestroy {
  private sub;
  article!: Article;
  articleComments!: BlogPagination;
  @Input()
  backToBlog!: string;

  categories: Category[] = [];

  constructor(
    private publicService: PublicService,
    private readonly route: ActivatedRoute
  ) {
    this.sub = this.route.params.subscribe((params) => {
      const id = params['id'];
      this.getArticleById(id);
      this.getAllArticlesComments(id);
    });
  }

  getArticleById(articleId: number) {
    this.publicService.getArticleById(articleId).subscribe((data) => {
      this.article = data.data;
    });
  }
  getAllArticlesComments(articleId: number) {
    this.publicService.getAllArticlesComments(articleId).subscribe((data) => {
      this.articleComments = data;
    });
  }

  category(categories: Category[], categoryId: number, property: string) {
    return categoryRender(categories, categoryId, property);
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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
