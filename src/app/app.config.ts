import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { PokemonList } from './pokemon/pokemon-list/pokemon-list';
import { PokemonProfile } from './pokemon/pokemon-profile/pokemon-profile';
import { PageNotFound } from './page-not-found/page-not-found';
import { PokemonEdit } from './pokemon/pokemon-edit/pokemon-edit';
import { provideHttpClient } from '@angular/common/http';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginComponent } from './login/login';
import { PokemonCreate } from './pokemon/pokemon-create/pokemon-create';

const routes: Routes = [
  {
    path: 'pokemons',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'create',
        component: PokemonCreate,
        title:"Ajout d'un Pokémon"
      },
      {
        path: 'edit/:id',
        component: PokemonEdit,
        title:"Edition d'un Pokémon"
      },
      {
        path: ':id',
        component: PokemonProfile,
        title:'Pokemons'
      },
      {
        path: '',
        component: PokemonList,
        title:'Pokédex'
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    title:'Page de Connexion'
  },


  { path: '**', component: PageNotFound },
];
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
  ]
};
