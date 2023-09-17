import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon/pokemon';

import * as data from './pokemon.json';

@Injectable({
  providedIn: 'root'
})
export class MockPokemonStorageService {

  loadFromJsonFile(): Pokemon[] {
    var pokemons: any = (data as any).default;
    console.log(pokemons);
    return pokemons;
  }
}