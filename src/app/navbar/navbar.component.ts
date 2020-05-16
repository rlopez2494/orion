import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  @Input() theme: string;
  @Output() switch: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  onThemeSwitch() {
    this.switch.emit({});
  }

}
