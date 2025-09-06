import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { PokemonBorder} from '../../pokemon-border';
import { PokemonService } from '../../pokemon';
import { Pokemon, PokemonList } from '../../pokemon.model';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { httpResource } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-pokemon-list',
    imports: [DatePipe,CommonModule, RouterLink, PokemonBorder,ReactiveFormsModule],
    templateUrl: './pokemon-list.html',
    styles: [
        `
      .pokemon-card {
        cursor: pointer;
      }
    `,
    ]
})
export class PokemonListComponent {
  readonly pokemonService = inject(PokemonService);
  readonly pokemonListRessource = httpResource<PokemonList>(()=> 'http://localhost:3000/pokemons',{
    defaultValue: []
  });
  readonly loading = computed(() => this.pokemonListRessource.isLoading());
  readonly searchTerm = signal('');
  readonly pokemonListFiltered = computed(() => {
    return this.pokemonListRessource.value().filter((pokemon) =>
      pokemon.name
        .toLowerCase()
        .includes(this.searchTerm().trim().toLowerCase())
    )
    .filter((pokemon) => {
      const typeSelected = this.typeSelected();
      if (!typeSelected) {
        return true;
      }
      return pokemon.types.includes(typeSelected);
    })
  });

  // readonly typeList = computed(() => {
  //   const allTypes = this.pokemonListRessource.()?.flatMap((pokemon) => pokemon.types);
  //   return [...new Set(allTypes)];
  // });
  readonly typeList = computed<string[]>(() => {
  const allTypes = this.pokemonListRessource.value()
    ?.flatMap((pokemon) => pokemon.types) ?? [];

  return [...new Set(allTypes.filter((t): t is string => !!t))];
});


  readonly typeSelected = linkedSignal<string[], string|null>({
    source: this.typeList,
    computation: (newTypeList, previous) => {
      const isTypeListEmpty = newTypeList.length === 0;
      if (isTypeListEmpty) {
        return null;
      }

      if(!previous?.value) {
        return null;
      }

      const isPreviousTypeSelectedValid = !!newTypeList.find(type => type === previous.value);

      if(isPreviousTypeSelectedValid) {
        return previous.value;
      }

      return newTypeList[0];
    }
  });


  size(pokemon: Pokemon) {
    if (pokemon.life <= 15) {
      return 'Petit';
    }
    if (pokemon.life >= 25) {
      return 'Grand';
    }

    return 'Moyen';
  }


  filterByType(type: string): void {
    const newType = this.typeSelected() === type ? null : type;
    this.typeSelected.set(newType);
  }

  removePokemon(pokemon: Pokemon): void {
    this.pokemonListRessource.update((pokemonList) => {
      return pokemonList.filter(({id}) => id !== pokemon.id);
    });
  }
}
