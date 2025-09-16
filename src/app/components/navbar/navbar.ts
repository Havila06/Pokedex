import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [ReactiveFormsModule,CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './navbar.html',
  standalone: true,
  styles: ``
})
export class Navbar implements OnInit{
  navbarOpen = false;

  constructor() {}

  ngOnInit(): void {}

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  };
}
