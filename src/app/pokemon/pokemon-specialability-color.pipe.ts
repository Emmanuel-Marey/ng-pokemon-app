import { Pipe, PipeTransform } from '@angular/core';
import { PokemonSpecialAbility } from './pokemon-specialability';

@Pipe({
  name: 'pokemonSpecialAbilityColor'
})
export class PokemonSpecialAbilityColorPipe implements PipeTransform {

  transform(specialAbility: PokemonSpecialAbility): string {
    let color: string;

    switch (specialAbility) {
      case PokemonSpecialAbility.cold:
        color = 'blue lighten-2';
        break;
      case PokemonSpecialAbility.severeCold:
        color = 'blue lighten-2';
        break;
      case PokemonSpecialAbility.coldBreath:
        color = 'blue lighten-2';
        break;
      case PokemonSpecialAbility.electricity:
        color = 'yellow accent-1';
        break;
      case PokemonSpecialAbility.lightning:
        color = 'yellow accent-2';
        break;
      case PokemonSpecialAbility.electricArc:
        color = 'yellow accent-3';
        break;
      case PokemonSpecialAbility.lightningChain:
        color = 'yellow accent-4';
        break;
      case PokemonSpecialAbility.fire:
        color = 'red lighten-2';
        break;
      case PokemonSpecialAbility.intenseFire:
        color = 'red lighten-2';
        break;
      case PokemonSpecialAbility.fireBreath:
        color = 'red lighten-2';
        break;
      case PokemonSpecialAbility.hotWater:
        color = 'blue lighten-3';
        break;
      case PokemonSpecialAbility.heatWater:
        color = 'blue lighten-3';
        break;
      case PokemonSpecialAbility.burningVapors:
        color = 'blue lighten-3';
        break;
      case PokemonSpecialAbility.benignPoison:
        color = 'green accent-1';
        break;
      case PokemonSpecialAbility.poison:
        color = 'green accent-1';
        break;
      case PokemonSpecialAbility.virulentPoison:
        color = 'green accent-1';
        break;
      case PokemonSpecialAbility.deadlyPoison:
        color = 'green accent-1';
        break;
      case PokemonSpecialAbility.darkness:
        color = 'grey lighten-3';
        break;
      case PokemonSpecialAbility.deepDarkness:
        color = 'grey lighten-3';
        break;
      case PokemonSpecialAbility.energyAbsorption:
        color = 'grey lighten-3';
        break;
      case PokemonSpecialAbility.death:
        color = 'grey lighten-3';
        break;
      case PokemonSpecialAbility.fighter:
        color = 'orange';
        break;
      case PokemonSpecialAbility.expertFighter:
        color = 'orange';
        break;
      case PokemonSpecialAbility.masterSwordsman:
        color = 'orange';
        break;
      case PokemonSpecialAbility.champion:
        color = 'orange';
        break;
      case PokemonSpecialAbility.apprenticeMagicUser:
        color = 'deep-purple accent-1';
        break;
      case PokemonSpecialAbility.magicUser:
        color = 'deep-purple accent-3';
        break;
      case PokemonSpecialAbility.mage:
        color = 'deep-purple accent-1';
        break;
      case PokemonSpecialAbility.archmage:
        color = 'deep-purple accent-3';
        break;
      case PokemonSpecialAbility.psionist:
        color = 'deep-purple accent-1';
        break;
      case PokemonSpecialAbility.psychicShield:
        color = 'deep-purple accent-1';
        break;
      case PokemonSpecialAbility.mentalExplosion:
        color = 'deep-purple accent-1';
        break;
      default:
        color = 'white';
        break;
    }

    return 'chip ' + color;
  }
}
