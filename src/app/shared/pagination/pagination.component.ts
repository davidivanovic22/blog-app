import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPagination } from '../../models/blog';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Output() changePage = new EventEmitter<string>();

  @Input()
  data!: BlogPagination;

  @Input()
  show: boolean = false;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
  }
  paginator(url: string): void {
    if (url != null) {
      const page = url.split('=')[1];
      localStorage.setItem('page', page);
      this.changePage.emit(page);
    }
  }
}
