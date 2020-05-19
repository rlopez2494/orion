import { Component, OnInit } from '@angular/core';
import { debounce } from 'underscore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { InquiryService } from './inquiry.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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


export class AppComponent implements OnInit{
  constructor(private inquiryService: InquiryService) {}

  // State variables
  theme: string;
  headerActive: boolean = false;
  isLoading: boolean = false;
  success: boolean = null;
  error: string = null;

  // Form Group
  inquirySubmit: FormGroup;



  ngOnInit() {
    const localTheme = localStorage.getItem('theme');

    if(localTheme) {

      document.body.classList.add(localTheme);
      this.theme = localTheme;
      
    } else {

      document.body.classList.add('dark-mode');
      this.theme = 'dark-mode';

    }

    document.addEventListener('scroll', debounce(this.handleHeaderScroll.bind(this), 50))

    this.inquirySubmit = new FormGroup({
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

  submitInquiry() {

    if(this.inquirySubmit.valid) {
      this.isLoading = true;
      this.success = false;
      this.error = null;
      const { email, message } = this.inquirySubmit.value;
    
    this.inquiryService.registerInquiry(email, message)
      .subscribe(responseData => {
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

  handleHeaderScroll(event: Event) {

    if(scrollY < 15) {
      return this.headerActive = false;
    }

    this.headerActive = true;

  }

  switchTheme() {
    if (document.body.classList[0] === 'dark-mode') {
      document.body.classList.replace('dark-mode', 'light-mode');

      this.theme = 'light-mode'
      
      localStorage.setItem('theme', this.theme);

    } else if (document.body.classList[0] === 'light-mode'){
        document.body.classList.replace('light-mode', 'dark-mode');

        this.theme = 'dark-mode'

        localStorage.setItem('theme', this.theme);
    }
  }
}
