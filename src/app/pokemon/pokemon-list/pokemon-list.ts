import { Component, computed, inject, signal } from '@angular/core';
import { PokemonService } from '../../pokemon';
import { PokemonBorder } from '../../pokemon-border';
import { DatePipe } from '@angular/common';
import { Pokemon } from '../../pokemon.model';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonBorder, DatePipe, RouterLink],
  templateUrl: './pokemon-list.html',
  styles: ``,
  providers: [PokemonService]
})
export class PokemonList {
  readonly #pokemonService = inject(PokemonService);
  readonly pokemonList = toSignal(this.#pokemonService.getPokemonList(),{
    initialValue: []
  });
  readonly searchTerm = signal('');
  readonly pokemonListFiltered = computed(() => {
    const searchTerm = this.searchTerm();
    const pokemonList = this.pokemonList();
    return pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
  });

  readonly loading = computed(() => this.pokemonList().length == 0);

  size(pokemon : Pokemon){
    if(pokemon.life <= 15){
      return 'Petit';
    }
    if(pokemon.life >= 25){
      return 'Grand';
    }
    return 'Moyen';
  };
  imageSrc = signal('https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png');

}
