import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PokemonSpecialAbility, SPECIAL_ABILITIES, SpecialAbility } from '../pokemon-specialability';
import { PokemonType } from '../pokemon-type';
import { PokemonAlignment } from '../pokemon-alignment';
import { PokemonMovement } from '../pokemon-movement';
import { PokemonSpecialDefense } from '../pokemon-specialdefense';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon;

  private maxSpecialAbilities: number = 3;

  types: number[];
  alignments: number[];
  movements: number[];
  specialAbilities: PokemonSpecialAbility[];
  specialDefenses: number[];

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private toasterService: ToastrService) { }

  ngOnInit(): void {
    this.types = this.pokemonService.getTypes();
    this.alignments = this.pokemonService.getAlignments();
    this.movements = this.pokemonService.getMovements();
    this.specialAbilities = this.pokemonService.getSpecialAbilities();
    this.specialDefenses = this.pokemonService.getSpecialDefenses();
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

  hasSpecialAbility(specialAbility: PokemonSpecialAbility): boolean {
    const specialAbilities = this.pokemon.specialAbilities.map(x => x.specialAbility);
    return specialAbilities.includes(specialAbility);
  }

  selectSpecialAbility($event: Event, specialAbility: PokemonSpecialAbility) {
    const isChecked = ($event.target as HTMLInputElement).checked;

    if (isChecked) {
      const parameters: SpecialAbility|undefined = SPECIAL_ABILITIES.find(x => x.specialAbility == specialAbility)
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
          this.router.navigate(['/pokemon', this.pokemon.id]);
          this.toasterService.success(`Le pokémon a été modifié avec succès.`, 'Modification effectuée', { timeOut: 2500 });
        },
        error: (error) => {
          this.toasterService.error(`La modification a échoué ${error}`, 'Erreur lors de la modification', { timeOut: 2500 });
        }
      });
  }

  onCancel(): void {
    this.router.navigate(['/pokemon', this.pokemon.id]);
    this.toasterService.warning(`Le pokémon n'a pas été modifié.`, 'Modification annulée', { timeOut: 2500 })
  }
}
