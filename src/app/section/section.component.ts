import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { 
  trigger, 
  state, 
  style, 
  animate, 
  transition, 
  AnimationEvent 
} from '@angular/animations';

import { debounce } from 'underscore';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  animations: [

    trigger('fade1', [
      state('normal', style({
        'opacity': '1',
        'transform': 'translateX(0)'
      })),
      state('faded', style({
        'opacity': '0',
        'transform': 'translateX(-50%)'
      })),
      transition('faded => normal', animate(500))
    ]),

    trigger('fade2', [
      state('normal', style({
        'opacity': '1',
        'transform': 'translateX(0)'
      })),
      state('faded', style({
        'opacity': '0',
        'transform': 'translateX(50%)'
      })),
      transition('faded => normal', animate(500))
    ]),

    trigger('fade-showcase', [
      state('visible', style({
        'opacity': '1'
      })),
      state('faded', style({
        'opacity': '0'
      })),
      transition('faded <=> visible', animate(200))
    ])
  ]
})


export class SectionComponent implements OnInit {

  constructor() { }

  // Theme input
  @Input() theme: string;

  // Section content input
  @Input() name: string;
  @Input() heading: string;
  @Input() text: string;
  @Input() imgSrc: string[];

  // Variable to invert the section layout ( switch text/image sides )
  @Input() inverted: boolean;
  

  // Animation state variables
  fadeElement1: string = 'faded';
  fadeElement2: string = 'faded';

  // Image showcase variables
  showcaseLink: string;
  showcaseState: string = 'faded';

  // variables to swap the text in the dev-plan section
  swapContent: boolean = false;
  swapHeading: string = 'Project reformation';
  swapText: string = 'Our team is ready to take care of your existing web project whether you wish to rearrange it or upscale it with brand new features. We deliver the best practices to refactor your project and make it more ideal to your company\'s necessities.' ;
  sectionTextState: string = null;

  // Child selector
  @ViewChild('fadeInWhenVisible', { static: true }) fadeWhenVisible: ElementRef; 

  ngOnInit() {
    this.showcaseLink = this.imgSrc[0];

    // Get the last event from the scroll events (made possible with the 'debounce' function from underscore js)
    document.addEventListener('scroll', debounce(this.scrollHandler.bind(this), 50));
  }

  // Animation activation when the section is visible on the device's viewport
  scrollHandler(event: any) {

    const element = this.fadeWhenVisible.nativeElement;
    
    const windowTop = window.pageYOffset;
    const windowBottom = windowTop + window.innerHeight;

    const elementTop = element.offsetTop;
    const elementBottom = element.offsetTop + element.offsetHeight;

    const elementInsideWindow = 
    (elementTop <= windowBottom && elementTop >= windowTop) || 
    (elementBottom >= windowTop && elementBottom <= windowBottom);

    const fadedToNormal = 
      (this.fadeElement1 === 'normal') && 
      (this.fadeElement2 === 'normal');

    if(elementInsideWindow && !fadedToNormal){
      this.fadeElement1 = 'normal';
      this.fadeElement2 = 'normal';
    }
  }

  onSwapContent(event: AnimationEvent) {

    // Execute swapping functions (text or images) depending on the section

    if(event.toState === 'normal') {

      this.showcaseState = 'visible';

      if(this.name === 'ui/ux-dev') {
        this.changeImages();
      }

      if(this.name === 'dev-plan') {
        this.changeSectionText();
      }
    }

  }

  // Switch the images in the 'ui/ux dev' section

  changeImages() {

    let count = this.imgSrc.indexOf(this.showcaseLink);
    const limit = this.imgSrc.length - 1;

    setInterval(() => {

      this.showcaseState = 'faded';

      setTimeout(() => {

        if(count < limit) {

          this.showcaseLink = this.imgSrc[count + 1];
          count = count + 1;
  
        } else {
  
          this.showcaseLink = this.imgSrc[0];
          count = 0;
         
        }

        setTimeout(() => {
          this.showcaseState = 'visible';
        }, 500);

      }, 320);

    },3000)
  }


  // Switch the images in the 'dev-plan' section

  changeSectionText() {

    setInterval(() => {

      this.sectionTextState = 'faded';

      setTimeout(() => {

        if(this.swapContent === true) {
          this.swapContent = false;
        } else {
          this.swapContent = true;
        }

        setTimeout(() => {
          this.sectionTextState = 'visible';
        }, 200);

      }, 320);

    },15000)
  }

}
