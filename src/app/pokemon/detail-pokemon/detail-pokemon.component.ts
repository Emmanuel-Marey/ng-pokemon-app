import { Component, OnInit } from '@angular/core';
import { Pokemon } from "../pokemon";
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PokemonType } from '../pokemon-type';
import { PokemonAlignment } from '../pokemon-alignment';
import { PokemonMovement } from '../pokemon-movement';
import { PokemonSpecialAbility } from '../pokemon-specialability';
import { PokemonSpecialDefense } from '../pokemon-specialdefense';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styles: [`
    .title-row-style { width: 160px; height: 32px; padding: 2px 4px 2px 0px }
    .value-row-style { height: 32px; padding: 2px 4px 2px 0px }
    .special-value-row-style { height: 48px; padding: 8px 4px 2px 0px }
  `]
})
export class DetailPokemonComponent implements OnInit {
  pokemon: Pokemon | undefined;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router,
    private toasterService: ToastrService) { }

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      const pokemonId: number = parseInt(id);
      this.pokemonService.getPokemonById(pokemonId).subscribe(pokemon => this.pokemon = pokemon);
    }
  }

  getType(type: PokemonType): string {
    return PokemonType.getType(type);
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
  
  deletePokemon(pokemon: Pokemon) {
    this.pokemonService.deletePokemonById(pokemon.id)
      .subscribe({
        next: () => {
          this.goToPokemonList()
          this.toasterService.success(`Le pokémon a été supprimé avec succès.`, 'Suppression effectuée', {timeOut: 2500});
        },
        error: (error) => {
          this.toasterService.error(`La supression a échoué ${error}`, 'Erreur lors de la suppression', {timeOut: 2500});
        }
    });
  }

  goToPokemonList() {
    this.router.navigate(['/pokemons']);
  }

  goToEditPokemon(pokemon: Pokemon) {
    this.router.navigate(['/edit/pokemon', pokemon.id]);
  }
}
