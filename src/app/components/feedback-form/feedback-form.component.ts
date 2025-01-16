import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Icon } from '../../models/icon.model';
import { ICONS } from '../../data/icons';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm!: FormGroup;
  iconsArray: Icon[] = ICONS;
  iconClicked: boolean = false;
  selectedIconIndex!: number;
  loading: boolean = false;
  disableIcons: boolean = false;
  showSuccessMessage: boolean = false;
  errorMessages = {
    ratingValue: 'Selecteer een beoordeling.',
    message: 'Mag niet leeg zijn.',
    apiError: ''
  };

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  onIconClick(ratingValue: number, $index: number) {
    if (this.disableIcons) return;

    this.selectedIconIndex = $index;
    this.iconClicked = true;

    this.feedbackForm.get('ratingValue')?.setValue(ratingValue);
  }

  submitForm() {
    this.feedbackForm.markAllAsTouched();

    if (this.feedbackForm.invalid) {
      return;
    }

    this.loading = true;

    const feedback = {
      ratingValue: this.feedbackForm.get('ratingValue')?.value,
      message: this.feedbackForm.get('message')?.value
    };

    this.feedbackService.submitFeedback(feedback).subscribe({
      next: () => {
        this.loading = false;
        this.disableIcons = true;
        this.showSuccessMessage = true;
        this.selectedIconIndex = -1;
      },
      error: error => {
        this.loading = false;
        this.errorMessages.apiError = error.message;
        console.error('Error submitting the form:', error);
      }
    })
  }

  private initializeForm() {
    this.feedbackForm = new FormGroup({
      ratingValue: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    });
  }
}
