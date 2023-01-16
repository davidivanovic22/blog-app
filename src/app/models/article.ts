import { Link } from './link';

export interface Article {
  id: number;
  title: string;
  body: string;
  user_id: number;
  category_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface ArticleResponse {
  data: Article;
}
