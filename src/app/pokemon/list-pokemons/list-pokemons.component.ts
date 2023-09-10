import { Component, OnInit } from '@angular/core';
import { Pokemon } from "../pokemon";
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { PokemonType } from '../pokemon-type';
import { PokemonAlignment } from '../pokemon-alignment';
import { PokemonMovement } from '../pokemon-movement';
import { PokemonSpecialAbility } from '../pokemon-specialability';
import { PokemonSpecialDefense } from '../pokemon-specialdefense';

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
  pokemonList: Pokemon[];
  largeCard: boolean = false;

  constructor(
    private router: Router,
    private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe(pokemonList => this.pokemonList = pokemonList);
  }

  getType(type: PokemonType): string {
    return PokemonType.getType(type);
  }

  getAlignment(alignment: PokemonAlignment): string {
    return PokemonAlignment.getAlignment(alignment);
  }

  getShortDescription(description: string): string {
    var index = description.indexOf(".");
    return description.substring(0, index +1);
  }

  getMovement(movement: PokemonMovement): string {
    return PokemonMovement.getMovement(movement);
  }

  getSpecialAbility(specialAbility: PokemonSpecialAbility): string {
    return PokemonSpecialAbility.getSpecialAbility(specialAbility);
  }

  getSpecialDefense(specialDefense: PokemonSpecialDefense): string {
    return PokemonSpecialDefense.getSpecialDefense(specialDefense);
  }

  goToPokemon(pokemon: Pokemon) {
    this.router.navigate(['/pokemon', pokemon.id]);
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
