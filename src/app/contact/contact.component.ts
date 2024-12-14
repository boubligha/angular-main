import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css',]
})
export class ContactComponent {
  contact = {
    name: '',
    email: '',
    number: '',
    msg: ''
  };

  searchQuery = '';
  profileActive = false;
  sidebarActive = false;
  darkMode = localStorage.getItem('dark-mode') === 'enabled';

  constructor() {
    if (this.darkMode) {
      this.enableDarkMode();
    }
  }

  onSearch() {
    console.log(`Searching for: ${this.searchQuery}`);
    // Add your search logic here
  }

  sendMessage() {
    console.log('Message sent:', this.contact);
    // Add your form submission logic here
  }

  toggleProfile() {
    this.profileActive = !this.profileActive;
  }

  toggleSearch() {
    const searchForm = document.querySelector('.search-form') as HTMLElement;
    if (searchForm) {
      searchForm.classList.toggle('active');
    }
    this.profileActive = false;
  }

  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
    document.body.classList.toggle('active', this.sidebarActive);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }

  enableDarkMode() {
    const toggleBtn = document.getElementById('toggle-btn') as HTMLElement;
    if (toggleBtn) {
      toggleBtn.classList.replace('fa-sun', 'fa-moon');
    }
    document.body.classList.add('dark');
    localStorage.setItem('dark-mode', 'enabled');
  }

  disableDarkMode() {
    const toggleBtn = document.getElementById('toggle-btn') as HTMLElement;
    if (toggleBtn) {
      toggleBtn.classList.replace('fa-moon', 'fa-sun');
    }
    document.body.classList.remove('dark');
    localStorage.setItem('dark-mode', 'disabled');
  }

  onWindowScroll() {
    if (window.innerWidth < 1200) {
      this.sidebarActive = false;
      document.body.classList.remove('active');
    }
  }
}
