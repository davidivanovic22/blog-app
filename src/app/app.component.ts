import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { PublicService } from './services/public.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly publicService: PublicService) {
  }
  ngOnInit(): void {
    this.getAllArticles()
    this.getAllCategories()
  }

  getAllArticles() {
    this.publicService.getAllArticles(localStorage.getItem('page')?.toString()).subscribe((data) => {
      this.publicService.onArticlesChange(data)
    });
  }

  getAllCategories() {
    this.publicService.getAllCategories().subscribe((data) => {
      this.publicService.onCategoriesChange(data)
    });
  }

 
}
