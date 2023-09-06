import { Injectable, OnDestroy } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { POKEMONS } from './mock-pokemon/mock-pokemon-list';

@Injectable({
  providedIn: 'root'
})
export class MemoryDatabaseService implements InMemoryDbService, OnDestroy {

  // Il faut lire les pokemon depuis le localstorage s'ils existent, sinon depuis le mock.
  createDb() {
    let pokemons = POKEMONS;
    return { pokemons };
  }

  // Il faut sauvegarder les données dans le localstorage avant de quitter et effectuer un dump sur le disque.
  ngOnDestroy() {

  }
}
