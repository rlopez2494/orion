import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InquiryService } from '../inquiry.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [
    trigger('fade-error', [
      state('in', style({
        'opacity': '1'
      })),
      state('void', style({
        'opacity': '0'
      })),
      transition('void => *', animate(200))
    ])
  ]
})
export class FooterComponent implements OnInit {

  constructor(private inquiryService: InquiryService) { }

  // Theme switch input
  @Input() theme: string;

  // Angular form declaration
  inquirySubmit: FormGroup;

  // Form error handling
  isLoading: boolean = false;
  success: boolean = null;
  error: string = null;

  ngOnInit() {
    
    this.inquirySubmit = new FormGroup({
      'name': new FormControl(
        null,
        [Validators.required]
      ),
      'email': new FormControl(
        null,
        [Validators.required, Validators.email]
      ),
      'message': new FormControl(
        null,
        [Validators.required]
      )
    })

  }

  // Error handling for the form submission
  submitInquiry() {

    if(this.inquirySubmit.valid) {
      this.isLoading = true;
      this.success = false;
      this.error = null;
      const { name, email, message } = this.inquirySubmit.value;
    
    this.inquiryService.registerInquiry(email, name, message)
      .subscribe(() => {
        this.isLoading = false;
        this.success = true;
      },
      (error) => {
        this.isLoading = false;
        this.error = 'Unexpected error, try again'
        console.log(error);
      })
    }
    
  }

}
