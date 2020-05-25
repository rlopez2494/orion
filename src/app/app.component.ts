import { Component, OnInit } from '@angular/core';
import { debounce } from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit{
  constructor() {}

  // State variables
  theme: string;

  // Variable to handle navbar styling if the user scrolls down
  headerActive: boolean = false;


  // Check if its a theme already saved in localstorage.
  // If not, apply default theme (dark)
  ngOnInit() {
    const localTheme = localStorage.getItem('theme');

    if(localTheme) {

      document.body.classList.add(localTheme);
      this.theme = localTheme;
      
    } else {

      document.body.classList.add('dark-mode');
      this.theme = 'dark-mode';

    }

    // Get the last event of the scroll events (made possible with 'debounce' function from 'underscorejs')
    document.addEventListener('scroll', debounce(this.handleHeaderScroll.bind(this), 50))

  }

  // Navbar style change if the user scrolls down
  handleHeaderScroll(event: Event) {

    if(scrollY < 15) {
      return this.headerActive = false;
    }

    this.headerActive = true;

  }

  // Switch theme and save theme on local storage
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
