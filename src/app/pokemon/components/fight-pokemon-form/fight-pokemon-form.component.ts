import { AfterViewInit, Component, Injectable, OnInit } from '@angular/core';
import { Pokemon } from "../../model/pokemon";
import { PokemonService } from '../../service/pokemon.service';
import { Fighter } from '../../model/pokemon-fighter';
import { PokemonSpecialAbility } from '../../model/pokemon-specialability';

export enum Team {
  ash = 0,
  goh = 1,
}

export enum GamePhase {
  newGame = 0,
  buildTeam = 1,
  selectFighter = 2,
  fight = 3,
  displayScore = 4,
  endGame = 5
}

export enum FightPhase {
  notStarted = 0,
  started = 1,
  initiative = 2,
  attack = 3,
  defend = 4,
  finished = 5
}

@Component({
  selector: 'app-fight-form',
  templateUrl: './fight-pokemon-form.component.html',
  styleUrls: ['./fight-pokemon-form.component.css']
})
export class FightPokemonFormComponent implements OnInit, AfterViewInit {
  pokemonService: PokemonService;
  pokemonList: Pokemon[];

  gamePhaseEnum: typeof GamePhase;
  gamePhase: GamePhase = GamePhase.newGame;
  fightPhaseEnum: typeof FightPhase;
  fightPhase: FightPhase = FightPhase.notStarted;

  fighterAsh: Fighter;
  fighterGoh: Fighter;

  round: number;
  initiativeAsh: number = 0;
  initiativeGoh: number = 0;

  initiative: number = 0;

  rounds: string[] = [];
  messages: string[] = [];
  hits: number[] = [0, 0];

  constructor(
    private _pokemonService: PokemonService) {
    this.pokemonService = this._pokemonService;

    this.gamePhaseEnum = GamePhase;
    this.fightPhaseEnum = FightPhase;
  }

  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe(
      pokemonList => {
        this.pokemonList = pokemonList;
      }
    );
  }

  ngAfterViewInit(): void {
    this.newGame();
  }

  newGame(): void {
    this.gamePhase = GamePhase.newGame;
  }

  endGame(): void {
    this.gamePhase = GamePhase.endGame;
  }

  buildTeam(): void {
    this.gamePhase = GamePhase.buildTeam;
  }

  selectFighter(): void {
    this.gamePhase = GamePhase.selectFighter;

    var pokemonAsh = this.pokemonList.find(pokemon => pokemon.id == 1);
    if (pokemonAsh) {
      this.fighterAsh = this.createFighter(pokemonAsh, 0);
    }

    this.selectRandomOpponent();
  }

  selectRandomOpponent(): void {
    var pokemonGoh = this.pokemonList.find(pokemon => pokemon.id == 37);
    if (pokemonGoh) {
      this.fighterGoh = this.createFighter(pokemonGoh, 1);
    }
  }

  createFighter(pokemon: Pokemon, team: number): Fighter {
    var fighter = new Fighter(pokemon);
    fighter.team = team;
    fighter.currentHitPoints = fighter.pokemon.hitPoints;
    return fighter;
  }

  fight(): void {
    this.gamePhase = GamePhase.fight;
    this.fightPhase = FightPhase.started;
    this.round = 1;
  }

  displayScore(): void {
    this.gamePhase = GamePhase.displayScore;
  }

  defineInitiative(): void {
    this.initiativeAsh = this.getD6();
    this.initiativeGoh = this.getD6();
  }

  attack(): void {
    this.round += 1;
    this.resolveAttack(this.fighterAsh, this.fighterGoh);
    this.initiative = 1;
  }

  defend(): void {
    this.resolveAttack(this.fighterGoh, this.fighterAsh);
    this.initiative = 0;
  }
  
  isFighting(): boolean {
    return this.gamePhase == GamePhase.fight;
  }

  isFightFinished(): boolean {
    return this.fightPhase == FightPhase.finished;
  }

  private resolveAttack(attacker: Fighter, defender: Fighter) {
    var round = `Round ${this.round} / ${attacker.team == 0 ? "Ash" : "Goh"}`;
    this.rounds[this.initiative] = round;

    var d20 = this.getD20();
    var attackScore = attacker.pokemon.attack + d20;
    var message = `Jet d'attaque : ${attacker.pokemon.attack} + ${d20} = ${attackScore}; `;

    var d10 = this.getD10();
    var defenseScore = defender.pokemon.defense + d10;
    message = message + `Jet de défense : ${defender.pokemon.defense} + ${d10} = ${defenseScore}; `;

    if (attackScore <= defenseScore) {
      this.hits[this.initiative] = 1;
    } else {
      var d6 = this.getD6nTimes(attacker.pokemon.damage);
      var damage = d6 - defender.pokemon.protection;

      if (damage <= 0) {
        this.hits[this.initiative] = 1;
        damage = 0;
      } else {
        this.hits[this.initiative] = 2;
        message = message + `Dégâts : ${d6} - ${defender.pokemon.protection} = ${damage}; `;
        defender.currentHitPoints -= damage;

        if (attacker.pokemon.specialAbilities.length > 0) {
          if (attacker.pokemon.specialAbilities[0].specialAbility == PokemonSpecialAbility.electricity) {
            if (attacker.pokemon.specialAbilities[0].damage != undefined) {
              var extraDamage = this.getD6nTimes(attacker.pokemon.specialAbilities[0].damage)
              defender.currentHitPoints -= extraDamage;
              message = `${message}Dégâts électriques : ${extraDamage}`;
            }
          }
        }

        if (defender.isDead()) {
          console.log("Mort");
          defender.currentHitPoints = 0;
          this.hits[this.initiative] = 3;

          this.fightPhase = FightPhase.finished;
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
      total += this.getD6();
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
