import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from "../pokemon";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PokemonSpecialAbility, SPECIAL_ABILITIES, SpecialAbility } from '../parameters/pokemon-specialability';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {
  pokemonService: PokemonService;
  @Input() pokemon: Pokemon;

  private maxSpecialAbilities: number = 3;

  types: number[];
  alignments: number[];
  movements: number[];
  specialAbilities: PokemonSpecialAbility[];
  specialDefenses: number[];

  constructor(
    private _pokemonService: PokemonService,
    private _router: Router,
    private _toasterService: ToastrService) {
    this.pokemonService = this._pokemonService;
  }

  ngOnInit(): void {
    this.types = this.pokemonService.getPokemonTypes();
    this.alignments = this.pokemonService.getAlignments();
    this.movements = this.pokemonService.getMovements();
    this.specialAbilities = this.pokemonService.getSpecialAbilities();
    this.specialDefenses = this.pokemonService.getSpecialDefenses();
  }

  hasSpecialAbility(specialAbility: PokemonSpecialAbility): boolean {
    const specialAbilities = this.pokemon.specialAbilities.map(x => x.specialAbility);
    return specialAbilities.includes(specialAbility);
  }

  selectSpecialAbility($event: Event, specialAbility: PokemonSpecialAbility) {
    const isChecked = ($event.target as HTMLInputElement).checked;

    if (isChecked) {
      const parameters: SpecialAbility | undefined = SPECIAL_ABILITIES.find(x => x.specialAbility == specialAbility)
      if (parameters) {
        this.pokemon.specialAbilities.push(
          { specialAbility: specialAbility, damage: parameters.damage, times: parameters.times, attack: parameters.attack, defense: parameters.defense });
      } else {
        this.pokemon.specialAbilities.push({ specialAbility: specialAbility });
      }
    } else {
      const specialAbilities = this.pokemon.specialAbilities.map(x => x.specialAbility);
      const index = specialAbilities.indexOf(specialAbility);
      this.pokemon.specialAbilities.splice(index, 1);
    }
  }

  isSpecialAbilityValidNew(specialAbility: PokemonSpecialAbility): boolean {
    if (this.pokemon.specialAbilities.length == this.maxSpecialAbilities && !this.hasSpecialAbility(specialAbility)) {
      return false;
    }

    return true;
  }

  onSubmit(): void {
    this.pokemonService.updatePokemon(this.pokemon)
      .subscribe({
        next: () => {
          this._router.navigate(['/pokemon', this.pokemon.id]);
          this._toasterService.success(`Le pokémon a été modifié avec succès.`, 'Modification effectuée', { timeOut: 2500 });
        },
        error: (error) => {
          this._toasterService.error(`La modification a échoué ${error}`, 'Erreur lors de la modification', { timeOut: 2500 });
        }
      });
  }

  onCancel(): void {
    this._router.navigate(['/pokemon', this.pokemon.id]);
    this._toasterService.warning(`Le pokémon n'a pas été modifié.`, 'Modification annulée', { timeOut: 2500 })
  }
}
