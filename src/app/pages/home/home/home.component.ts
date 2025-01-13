import { Component } from '@angular/core';
import { FeedbackFormComponent } from "../../../components/feedback-form/feedback-form/feedback-form.component";
import { BlogsListComponent } from "../../../components/blog/blogs-list/blogs-list.component";

@Component({
  selector: 'app-home',
  imports: [FeedbackFormComponent, BlogsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
