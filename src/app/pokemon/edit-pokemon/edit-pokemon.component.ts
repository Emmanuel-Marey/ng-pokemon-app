import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-edit-pokemon',
  templateUrl: './edit-pokemon.component.html',
  styles: [
  ]
})
export class EditPokemonComponent implements OnInit {
  pokemon: Pokemon|undefined;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {};

  ngOnInit(): void {   
    const id: string|null = this.route.snapshot.paramMap.get('id');
    if (id) {
      const pokemonId: number = parseInt(id);
      this.pokemonService.getPokemonById(pokemonId).subscribe(pokemon => this.pokemon = pokemon);
    } else {
      this.pokemon = undefined;
    }
  }
}
