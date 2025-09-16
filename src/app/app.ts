import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true, // important si c'est un composant standalone
  imports: [RouterOutlet, Navbar,Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {

}
