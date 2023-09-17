import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { MockPokemonStorageService } from './mock-pokemon-storage.service';
import { LocalStorageService } from './local-storage.service';
import { Pokemon } from './pokemon/pokemon';

@Injectable({
  providedIn: 'root'
})
export class MemoryDatabaseService implements InMemoryDbService {

  pokemons: Pokemon[];

  constructor(
    private mockPokemonStorageService: MockPokemonStorageService,
    private localStorageService: LocalStorageService) {
  }

  clearDb() {
    this.localStorageService.clearData();
  }

  createDb() {
    console.log("Create database");

    var stringifiedData: string = this.localStorageService.getData("pokemons");
    if (stringifiedData) {
      console.log("Load pokemons from local storage");
      var pokemons = <Pokemon[]>JSON.parse(stringifiedData);
      this.pokemons = pokemons;
      return { pokemons };
    } else {
      console.log("Load pokemons from json file");
      var pokemons = this.mockPokemonStorageService.loadFromJsonFile();
      this.pokemons = pokemons;
      return { pokemons };
    }
  }

  saveDb() {
    var json = JSON.stringify(this.pokemons);
    this.localStorageService.saveData("pokemons", json);
  }
}
