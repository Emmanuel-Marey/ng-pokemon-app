import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, of, tap } from 'rxjs';

import { Pokemon } from "../model/pokemon";
import { PokemonSpecialAbility } from "../model/pokemon-specialability";
import { PokemonType } from '../model/pokemon-type';
import { PokemonAlignment } from '../model/pokemon-alignment';
import { PokemonMovement } from '../model/pokemon-movement';
import { PokemonSpecialDefense } from '../model/pokemon-specialdefense';

@Injectable()
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  searchPokemonList(term: string): Observable<Pokemon[]> {
    if (term.length < 2) {
      return of([]);
    }

    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  addPokemon(pokemon: Pokemon): Observable<null> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon | undefined> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    pokemon.updated = new Date();

    return this.http.put('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  deletePokemonById(pokemonId: number): Observable<null> {
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

  getPokemonTypes(): number[] {
    return PokemonType.getPokemonTypes();
  }

  getAlignments(): number[] {
    return PokemonAlignment.getAlignments();
  }

  getMovements(): number[] {
    return PokemonMovement.getMovements();
  }

  getSpecialAbilities(): PokemonSpecialAbility[] {
    return PokemonSpecialAbility.getSpecialAbilities();
  }

  getSpecialDefenses(): number[] {
    return PokemonSpecialDefense.getSpecialDefenses();
  }

  getPokemonType(type: PokemonType): string {
    return PokemonType.getPokemonType(type);
  }

  getShortDescription(description: string): string {
    var index = description.indexOf(".");
    return description.substring(0, index +1);
  }

  getAlignment(alignment: PokemonAlignment): string {
    return PokemonAlignment.getAlignment(alignment);
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
}
