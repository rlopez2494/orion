import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { debounce } from 'underscore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
  title = 'orion-landing';
  theme: string;
  headerActive: boolean = false;

  inquirySubmit: FormGroup;

  ngOnInit() {
    this.theme = document.body.classList[0];

    document.addEventListener('scroll', debounce(this.handleHeaderScroll.bind(this), 50))

    this.inquirySubmit = new FormGroup({
      'email': new FormControl(
        null,
        [Validators.required, Validators.email]
      ),
      'inquiry': new FormControl(
        null,
        [Validators.required]
      )
    })

  }

  submitInquiry() {
    console.log(this.inquirySubmit.value);
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

    } else if (document.body.classList[0] === 'light-mode'){
        document.body.classList.replace('light-mode', 'dark-mode');
        this.theme = 'dark-mode'
    }
  }
}
