import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Pokemon } from "../pokemon";
import { PokemonService } from '../pokemon.service';
import { Fighter } from '../fighter';
import { PokemonSpecialAbility } from '../parameters/pokemon-specialability';

export enum Team {
  ash = 0,
  goh = 1,
}

export enum GamePhase {
  newGame = 0,
  selectTeams = 1,
  startSelectFighters = 2,
  endSelectFighters = 3,
  fight = 4,
  displayScore = 5,
  endGame = 6
}

export enum FightPhase {
  start = 0,
  initiative = 1,
  attack = 2,
  defend = 3,
  end = 4
}

@Component({
  selector: 'app-fight-form',
  templateUrl: './fight-form.component.html',
  styleUrls: ['./fight-form.component.css']
})
export class FightFormComponent implements OnInit, AfterViewInit {
  pokemonService: PokemonService;
  pokemonList: Pokemon[];

  gamePhase: GamePhase = GamePhase.newGame;

  fighterAsh: Fighter;
  fighterGoh: Fighter;

  round: number;
  initiative: number = 0;

  rounds: string[] = [];
  messages: string[] = [];
  hits: number[] = [0, 0];

  constructor(
    private _pokemonService: PokemonService) {
    this.pokemonService = this._pokemonService;
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
    this.selectTeams();
    this.selectFighters();
  }

  isSelectingTeam(): boolean {
    return this.gamePhase == GamePhase.selectTeams;
  }

  isSelectingFighters(): boolean {
    return this.gamePhase == GamePhase.startSelectFighters;
  }

  isFighting(): boolean {
    return this.gamePhase == GamePhase.fight;
  }

  newGame(): void {
    this.gamePhase = GamePhase.newGame;
  } 

  selectTeams(): void {
    this.gamePhase = GamePhase.selectTeams;
  }

  selectFighters(): void {
    this.gamePhase = GamePhase.startSelectFighters;

    var pokemonAsh = this.pokemonList.find(pokemon => pokemon.id == 1);
    if (pokemonAsh) {
      this.fighterAsh = this.selectFighter(pokemonAsh, 0);
    }
    var pokemonGoh = this.pokemonList.find(pokemon => pokemon.id == 37);
    if (pokemonGoh) {
      this.fighterGoh = this.selectFighter(pokemonGoh, 1);
    }

    this.gamePhase = GamePhase.endSelectFighters;
  }

  selectFighter(pokemon: Pokemon, team: number): Fighter {
    var fighter = new Fighter(pokemon);
    fighter.team = team;
    fighter.currentHitPoints = fighter.pokemon.hitPoints;
    return fighter;
  }

  fight(): void {
    this.gamePhase = GamePhase.fight;
    this.round = 1;
  }

  private defineInitiative(): void {
  }

  attack(): void {
    this.round += 1;
    this.resolveAttack(this.fighterAsh, this.fighterAsh);
    this.initiative = 1;
  }

  defend(): void {
    this.resolveAttack(this.fighterGoh, this.fighterAsh);
    this.initiative = 0;
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
