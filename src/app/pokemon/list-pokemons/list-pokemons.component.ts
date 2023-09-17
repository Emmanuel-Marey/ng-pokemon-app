import { Component, OnInit } from '@angular/core';
import { Pokemon } from "../pokemon";
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { PokemonType } from '../parameters/pokemon-type';
import { PokemonAlignment } from '../parameters/pokemon-alignment';
import { PokemonMovement } from '../parameters/pokemon-movement';
import { PokemonSpecialAbility } from '../parameters/pokemon-specialability';
import { PokemonSpecialDefense } from '../parameters/pokemon-specialdefense';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.component.html',
  styles: [`
    .space {
      width: 12px;
      height: auto;
      display: inline-block;
    }`
  ]
})
export class ListPokemonsComponent implements OnInit {
  pokemonService: PokemonService;
  pokemonList: Pokemon[];
  largeCard: boolean = false;

  constructor(
    private _pokemonService: PokemonService,
    private _router: Router) {
    this.pokemonService = this._pokemonService;
  }

  ngOnInit(): void {
    this._pokemonService.getPokemonList().subscribe(pokemonList => this.pokemonList = pokemonList);
  }

  goToPokemon(pokemon: Pokemon) {
    this._router.navigate(['/pokemon', pokemon.id]);
  }

  sortPokemonListById() {
    this.pokemonList.sort(
      function (left: Pokemon, right: Pokemon) {
        if (left.id < right.id) {
          return -1;
        }
        if (left.id > right.id) {
          return 1;
        }
        return 0;
      }
    );
  }

  sortPokemonListByName() {
    this.pokemonList.sort(
      function (left: Pokemon, right: Pokemon) {
        var leftName = left.name.toUpperCase();
        var rightName = right.name.toUpperCase();
        if (leftName < rightName) {
          return -1;
        }
        if (leftName > rightName) {
          return 1;
        }
        return 0;
      }
    );
  }

  sortPokemonListByLevelAndName() {
    this.pokemonList.sort(
      function (left: Pokemon, right: Pokemon) {
        if (left.level < right.level) {
          return -1;
        }
        if (left.level > right.level) {
          return 1;
        }

        var leftName = left.name.toUpperCase();
        var rightName = right.name.toUpperCase();
        if (leftName < rightName) {
          return -1;
        }
        if (leftName > rightName) {
          return 1;
        }
        return 0;
      }
    );
  }

  sortPokemonListByTypeAndName() {
    this.pokemonList.sort(
      function (left: Pokemon, right: Pokemon) {
        if (left.type < right.type) {
          return -1;
        }
        if (left.type > right.type) {
          return 1;
        }

        var leftName = left.name.toUpperCase();
        var rightName = right.name.toUpperCase();
        if (leftName < rightName) {
          return -1;
        }
        if (leftName > rightName) {
          return 1;
        }
        return 0;
      }
    );    
  }

  sortPokemonListByAlignmentAndId() {
    this.pokemonList.sort(
      function (left: Pokemon, right: Pokemon) {
        if (left.alignment < right.alignment) {
          return -1;
        }
        if (left.alignment > right.alignment) {
          return 1;
        }

        if (left.id < right.id) {
          return -1;
        }
        if (left.id > right.id) {
          return 1;
        }
        return 0;
      }
    );
  }

  displayLargeCard(): void {
    const checkbox = document.getElementById("largeCard") as HTMLInputElement | null;
    if (checkbox != null) {
        this.largeCard = checkbox.checked;
    }
  }
}
