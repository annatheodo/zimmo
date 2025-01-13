import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FeedbackService } from '../../../services/feedback.service';
import { Icon } from '../../../models/icon.model';
import { ICONS } from '../../../data/icons';

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
  apiErrorMessage: string = '';
  ratingErrorMessage: string = '';
  messageErrorMessage: string = '';
  submitted: boolean = false;
  loading: boolean = false;
  disableIcons: boolean = false;
  showSuccessMessage: boolean = false;

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.feedbackForm.get('message')?.valueChanges.subscribe(() => {
      this.clearErrorMessages();
    });
  }

  onIconClick(ratingValue: number, $index: number) {
    if (this.disableIcons) return;

    this.selectedIconIndex = $index;
    this.iconClicked = true;

    this.feedbackForm.get('ratingValue')?.setValue(ratingValue);
    this.ratingErrorMessage = '';
  }

  submitForm() {
    this.submitted = true;
    this.feedbackForm.markAllAsTouched();

    if (this.feedbackForm.invalid) {
      const ratingError = this.feedbackForm.get('ratingValue')?.errors?.['required'];
      const messageError = this.feedbackForm.get('message')?.errors?.['required'];

      this.ratingErrorMessage = ratingError ? 'Selecteer een beoordeling.' : '';
      this.messageErrorMessage = messageError ? 'Mag niet leeg zijn.' : '';

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
        this.apiErrorMessage = error.message;
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

  private clearErrorMessages() {
    this.submitted = false;
    this.ratingErrorMessage = '';
    this.messageErrorMessage = '';
    this.apiErrorMessage = '';
  }
}
