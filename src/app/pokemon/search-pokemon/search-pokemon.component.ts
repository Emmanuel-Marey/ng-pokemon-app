import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styles: [
  ]
})
export class SearchPokemonComponent implements OnInit {
  private searchTerms = new Subject<string>();
  
  public pokemonList$: Observable<Pokemon[]>; 

  constructor(
    private router: Router,
    private pokemonService: PokemonService)
  {}

  public ngOnInit(): void {
    this.pokemonList$ = this.searchTerms.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap((term) => this.pokemonService.searchPokemonList(term))
    );
  }
  
  public search(term: string) {
    this.searchTerms.next(term);
  }

  public goToDetail(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }
}
