import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list';
import { PokemonProfile } from './pokemon/pokemon-profile/pokemon-profile';
import { PageNotFound } from './page-not-found/page-not-found';
import { PokemonEdit } from './pokemon/pokemon-edit/pokemon-edit';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './auth/login/login';
import { PokemonCreate } from './pokemon/pokemon-create/pokemon-create';
import { PokemonService } from './pokemon';
import { PokemonJSONServerService } from './pokemon-json-server.service';
import { Register } from './auth/register/register';
import { Home } from './views/home/home';
import { Pokedex } from './views/pokedex/pokedex';
import { Generations } from './views/generations/generations';
import { Types } from './views/types/types';
import { Favorite } from './views/favorite/favorite';
import { Contact } from './views/contact/contact';
import { AboutUs } from './views/about-us/about-us';

export function pokemonServiceFactory(): PokemonService {
  // return environment.production
  //   ? new PokemonLocalStorageService()
  return new PokemonJSONServerService();
}

const routes: Routes = [
  {
    path: '',
    component: Home,
    title: "Page d'accueil",
  },
  {
    path: 'pokedex',
    component: Pokedex,
    title: "Pokedex'",
  },
  {
    path: 'types',
    component: Types,
    title: "Types de pokemon",
  },
  {
    path: 'generations',
    component: Generations,
    title: "Générations de Pokémon",
  },
  {
    path: 'favoris',
    component: Favorite,
    title: "Mes Favoris",
  },
  {
    path: 'contact',
    component: Contact,
    title: "Contactez-nous'",
  },
  {
    path: 'about-us',
    component: AboutUs,
    title: "A propos'",
  },
  {
    path: 'register',
    component: Register,
    title: "Page d'inscription",
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Page de connexion',
  },
  {
    path: 'pokemons',
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: PokemonListComponent,
        title: 'Pokédex',
      },
      {
        path: 'add',
        component: PokemonCreate,
        title: 'Pokémon',
      },
      {
        path: 'edit/:id',
        component: PokemonEdit,
        title: 'Pokémon',
      },
      {
        path: ':id',
        component: PokemonProfile,
        title: 'Pokémon',
      },
    ],
  },
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
  { path: '**', component: PageNotFound, title: 'Page introuvable' },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: PokemonService,
      useFactory: pokemonServiceFactory,
    },
  ],
};
