import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon';
import { DatePipe, NgFor } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';


@Component({
  selector: 'app-pokemon-profile',
  imports: [DatePipe, NgFor, RouterLink],
  templateUrl: './pokemon-profile.html',
  styles: ``
})
export class PokemonProfile {
  private readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  private readonly pokemonService = inject(PokemonService);

  private readonly pokemonId = signal(Number(this.route.snapshot.paramMap.get('id')));
  readonly pokemonResource = this.pokemonService.getPokemonById(this.pokemonId);

  deletePokemon(pokemonId: number) {
  this.pokemonService.deletePokemon(pokemonId).subscribe(() => {
    this.router.navigate(['/pokemons']);
  });
}

}
