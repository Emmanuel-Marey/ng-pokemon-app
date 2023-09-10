import { Component, OnInit } from '@angular/core';
import { Pokemon } from "../pokemon";
import { PokemonType } from '../pokemon-type';
import { PokemonAlignment } from '../pokemon-alignment';
import { PokemonService } from '../pokemon.service';
import { PokemonFighter } from '../pokemonFighter';
import { PokemonSpecialAbility } from '../pokemon-specialability';

@Component({
  selector: 'app-fight-form',
  templateUrl: './fight-form.component.html',
  styleUrls: ['./fight-form.component.css']
})
export class FightFormComponent implements OnInit {
  pokemonList: Pokemon[];

  opponentsSelected: Boolean = false;

  pokemonFighterAsh: PokemonFighter;
  pokemonFighterGoh: PokemonFighter;

  round: number = 0;
  initiative: number = 0;

  rounds: string[] = [];
  messages: string[] = [];
  hits: number[] = [0, 0];

  constructor(
    private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe(
      pokemonList => {
        this.pokemonList = pokemonList;
      }
    );
  }

  selectOpponents(): void {
    var pokemonAsh = this.pokemonList.find(p => p.id == 1);
    if (pokemonAsh) {
      this.pokemonFighterAsh = this.selectPokemonFighter(pokemonAsh, 0);
    }
    var pokemonGoh = this.pokemonList.find(p => p.id == 37);
    if (pokemonGoh) {
      this.pokemonFighterGoh = this.selectPokemonFighter(pokemonGoh, 1);
    }

    this.opponentsSelected = true;
  }

  selectPokemonFighter(pokemon: Pokemon, team: number): PokemonFighter {
    var pokemonFighter = new PokemonFighter(
      pokemon.id,
      pokemon.name,
      pokemon.level,
      pokemon.description,
      pokemon.type,
      pokemon.subType,
      pokemon.alignment,
      pokemon.size,
      pokemon.weight,
      pokemon.hitPoints,
      pokemon.protection,
      pokemon.movement,
      pokemon.attack,
      pokemon.damage,
      pokemon.defense,
      pokemon.specialAbilities,
      pokemon.specialDefense,
      pokemon.picture,
      pokemon.created,
      pokemon.updated);
    pokemonFighter.team = team;
    pokemonFighter.currentHitPoints = pokemonFighter.hitPoints;
    return pokemonFighter;
  }

  getType(type: PokemonType): string {
    return PokemonType.getType(type);
  }

  getAlignment(alignment: PokemonAlignment): string {
    return PokemonAlignment.getAlignment(alignment);
  }

  attack(): void {
    this.round += 1;

    this.resolveAttack(this.pokemonFighterAsh, this.pokemonFighterGoh);

    this.initiative = 1;
  }

  defend(): void {
    this.resolveAttack(this.pokemonFighterGoh, this.pokemonFighterAsh);

    this.initiative = 0;
  }

  private resolveAttack(attacker: PokemonFighter, defender: PokemonFighter) {
    var round = `Round ${this.round} / ${attacker.team == 0 ? "Ash" : "Goh"}`;
    this.rounds[this.initiative] = round;

    var d20 = this.getD20();
    var attackScore = attacker.attack + d20;
    var message = `Jet d'attaque : ${attacker.attack} + ${d20} = ${attackScore}; `;

    var d10 = this.getD10();
    var defenseScore = defender.defense + d10;
    message = message + `Jet de défense : ${defender.defense} + ${d10} = ${defenseScore}; `;

    if (attackScore <= defenseScore) {
      this.hits[this.initiative] = 1;
    } else {
      var d6 = this.getD6nTimes(attacker.damage);
      var damage = d6 - defender.protection;

      if (damage <= 0) {
        this.hits[this.initiative] = 1;
        damage = 0;
      } else {
        this.hits[this.initiative] = 2;
        message = message + `Dégâts : ${d6} - ${defender.protection} = ${damage}; `;
        defender.currentHitPoints -= damage;

        if (attacker.specialAbilities.length > 0) {
          if (attacker.specialAbilities[0].specialAbility == PokemonSpecialAbility.electricity) {
            if (attacker.specialAbilities[0].damage != undefined) {
              var extraDamage = this.getD6nTimes(attacker.specialAbilities[0].damage)
              defender.currentHitPoints -= extraDamage;
              message = message + `Dégâts électriques : ${extraDamage}`;
            }
          }
        }

        if (defender.currentHitPoints <= 0) {
          this.hits[this.initiative] = 3;
        }
      }
    }

    this.messages[this.initiative] = message;
  }

  private getD20(): number {
    return this.getRandomInt(1, 20);
  }

  private getD10(): number {
    return this.getRandomInt(1, 10);
  }

  private getD6nTimes(times: number): number {
    let total = 0;
    for (var i = 0; i < times; i++) {
      total += this.getRandomInt(1, 6);
    }
    return total;
  }

  private getD6(): number {
    return this.getRandomInt(1, 6);
  }

  private getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
