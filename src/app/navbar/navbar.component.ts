import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  // Event emitter to switch between themes
  @Output() switch: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  onThemeSwitch() {  
    this.switch.emit({});
  }

}
