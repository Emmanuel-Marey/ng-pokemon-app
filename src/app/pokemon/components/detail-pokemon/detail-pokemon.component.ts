import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Pokemon } from "../../model/pokemon";
import { PokemonService } from '../../service/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import * as M from "materialize-css";

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styles: [`
    .title-row-style { width: 160px; height: 32px; padding: 2px 4px 2px 0px }
    .value-row-style { height: 32px; padding: 2px 4px 2px 0px }
    .special-value-row-style { height: 48px; padding: 8px 4px 2px 0px }
  `]
})
export class DetailPokemonComponent implements OnInit, AfterViewInit {
  pokemonService: PokemonService;
  pokemon: Pokemon | undefined;

  constructor(
    private _pokemonService: PokemonService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _toasterService: ToastrService) {
    this.pokemonService = this._pokemonService;
  }

  ngOnInit(): void {
    const id: string | null = this._route.snapshot.paramMap.get('id');
    console.log("id: " + id);
    if (id) {
      const pokemonId: number = parseInt(id);
      this.pokemonService.getPokemonById(pokemonId).subscribe(pokemon => this.pokemon = pokemon);
    }
  }

  ngAfterViewInit(): void {
    var modalList = document.querySelectorAll('.modal');
    console.log('modalList: ' + modalList[0].id);
    M.Modal.init(modalList, {});
  }

  deletePokemon(pokemon: Pokemon) {
    this.pokemonService.deletePokemonById(pokemon.id)
      .subscribe({
        next: () => {
          this.goToPokemonList()
          this._toasterService.success(`Le pokémon a été supprimé avec succès.`, 'Suppression effectuée', { timeOut: 2500 });
        },
        error: (error) => {
          this._toasterService.error(`La supression a échoué ${error}`, 'Erreur lors de la suppression', { timeOut: 2500 });
        }
      });
  }

  goToPokemonList() {
    this._router.navigate(['/pokemons']);
  }

  goToEditPokemon(pokemon: Pokemon) {
    this._router.navigate(['/edit/pokemon', pokemon.id]);
  }
}
