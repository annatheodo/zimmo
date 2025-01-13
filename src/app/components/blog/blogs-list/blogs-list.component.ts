import { Component } from '@angular/core';
import { BlogArticleComponent } from "../blog-article/blog-article.component";

@Component({
  selector: 'app-blogs-list',
  imports: [BlogArticleComponent],
  templateUrl: './blogs-list.component.html',
  styleUrl: './blogs-list.component.scss'
})
export class BlogsListComponent {

}
