import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Pokemon {
  name: string;
  type: string[];
  image: string;
  capacites: string[];
  stats: {
    attaque: number;
    defense: number;
    vitesse: number;
  };
}

interface News {
  title: string;
  summary: string;
  link: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './home.html',
  styles: ``
})
export class Home implements OnInit {
  // Etat du menu mobile
  navbarOpen = false;

  // Top Pokémon
  topPokemons: Pokemon[] = [
    {
      "name": "Bulbizarre",
      "capacites": ["Charge", "Fouet Lianes"],
      "stats": {"attaque": 49,"defense": 49,"vitesse": 45},
      "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
      "type": ["Plante","Poison"]
    },
    {
      "name": "Salamèche",
      "capacites": ["Griffe", "Flammèche"],
      "stats": {"attaque": 52,"defense": 43,"vitesse": 65},
      "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png",
      "type": ["Feu"],
    },
    {
      "name": "Dracaufeu",
      "capacites": ["Griffe", "Flammèche", "Lance-Flammes"],
      "stats": {"attaque": 84,"defense": 78,"vitesse": 100},
      "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/006.png",
      "type": ["Feu","Vol"],
    },
    {
      "name": "Roucoups",
      "capacites": ["Charge", "Picpic", "Vent Arrière"],
      "stats": {"attaque": 60,"defense": 55,"vitesse": 70},
      "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/017.png",
      "type": ["Normal","Vol"],
    },
    {
      "name": "Tortank",
      "capacites": ["Hydrocanon", "Morsure", "Pistolet à O"],
      "stats": {"attaque": 83,"defense": 100,"vitesse": 78},
      "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/009.png",
      "type": ["Eau"],
    },
  ];

  // Actualités Pokémon
  newsList: News[] = [
    { title: 'Nouvelle génération annoncée !', summary: 'Découvrez les Pokémon de la prochaine génération.', link: '/news/1' },
    { title: 'Tournoi Pokémon en ligne', summary: 'Participez au tournoi mondial et gagnez des récompenses.', link: '/news/2' },
    { title: 'Événement spécial Pikachu', summary: 'Des Pikachu rares apparaissent dans certaines zones.', link: '/news/3' }
  ];

  constructor() {}

  ngOnInit(): void {
    // Ici tu peux déclencher des animations ou loader des données depuis une API
  }

  // Ferme le menu mobile quand un lien est cliqué
  closeNavbar() {
    this.navbarOpen = false;
  }
}
