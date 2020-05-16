import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
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
    ])
  ]
})
export class SectionComponent implements OnInit {

  constructor() { }

  // Input variables
  @Input() name: string;
  @Input() heading: string;
  @Input() text: string;
  @Input() imgSrc: string;
  @Input() inverted: boolean;
  @Input() theme: string;

  // Animation state variables
  fadeElement1: string = 'faded';
  fadeElement2: string = 'faded';

  // Child selector
  @ViewChild('fadeInWhenVisible', { static: true }) fadeWhenVisible: ElementRef; 

  ngOnInit() {

    document.addEventListener('scroll', debounce(this.scrollHandler.bind(this), 50));

  }

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

}
