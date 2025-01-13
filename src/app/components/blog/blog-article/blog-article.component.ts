import { Component } from '@angular/core';
import { Article } from '../../../models/article.model';
import { MOCK_ARTICLES } from '../../../data/mock-articles';

@Component({
  selector: 'app-blog-article',
  imports: [],
  templateUrl: './blog-article.component.html',
  styleUrl: './blog-article.component.scss'
})
export class BlogArticleComponent {
  articles: Article[] = MOCK_ARTICLES;
}
