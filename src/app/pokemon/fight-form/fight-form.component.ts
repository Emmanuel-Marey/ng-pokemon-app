import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Pokemon } from "../pokemon";
import { PokemonService } from '../pokemon.service';
import { Fighter } from '../fighter';
import { PokemonSpecialAbility } from '../parameters/pokemon-specialability';

export enum GamePhase {
  notStarted = 0,
  startGame = 1,
  selectTeams = 2,
  selectFighters = 3,
  fighting = 4,
  nextPokemons = 5,
  endGame = 6
}

export enum FightPhase {
  startFight = 0,
  initiative = 1,
  newRound = 2,
  attack = 3,
  defend = 4,
  endFight = 5
}

@Component({
  selector: 'app-fight-form',
  templateUrl: './fight-form.component.html',
  styleUrls: ['./fight-form.component.css']
})
export class FightFormComponent implements OnInit, AfterViewInit {
  pokemonService: PokemonService;
  pokemonList: Pokemon[];

  gamePhase: GamePhase = GamePhase.notStarted;

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
    this.gamePhase = GamePhase.startGame;
    this.gamePhase = GamePhase.selectTeams;
    this.gamePhase = GamePhase.selectFighters;
  }

  private nextGamePhase(): void {
    if (this.gamePhase == GamePhase.notStarted) {
      this.startGame();
    } else if (this.gamePhase == GamePhase.startGame) {
      this.selectTeams();
    }
  }

  private startGame(): void {
    this.gamePhase = GamePhase.startGame;
  }

  private selectTeams(): void {
    this.gamePhase = GamePhase.selectTeams;
  }

  isSelectingFighters(): boolean {
    return this.gamePhase == GamePhase.selectFighters;
  }

  private selectFighters(): void {
    this.gamePhase = GamePhase.selectFighters;
  }

  private defineInitiative(): void {
  }

  private startFight(): void {
    this.gamePhase = GamePhase.fighting;
    this.round = 1;
  }

  isFighting(): boolean {
    return this.gamePhase == GamePhase.fighting;
  }

  selectPokemons(): void {
    var pokemonAsh = this.pokemonList.find(pokemon => pokemon.id == 1);
    if (pokemonAsh) {
      this.fighterAsh = this.selectPokemon(pokemonAsh, 0);
    }
    var pokemonGoh = this.pokemonList.find(pokemon => pokemon.id == 37);
    if (pokemonGoh) {
      this.fighterGoh = this.selectPokemon(pokemonGoh, 1);
    }

    this.startFight();
  }

  selectPokemon(pokemon: Pokemon, team: number): Fighter {
    var fighter = new Fighter(
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
    fighter.team = team;
    fighter.currentHitPoints = fighter.hitPoints;
    return fighter;
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
              message = `${message}Dégâts électriques : ${extraDamage}`;
            }
          }
        }

        if (defender.currentHitPoints <= 0) {
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
