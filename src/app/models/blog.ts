import { Article } from "./article";
import { Category } from "./category";
import { Link } from "./link";

export interface BlogPagination {
    current_page: number;
    data: Category[] | Article[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url?: any;
    to: number;
    total: number;
  }