import { Pipe, PipeTransform } from '@angular/core';
import { PokemonSpecialDefense } from '../parameters/pokemon-specialdefense';

@Pipe({
  name: 'pokemonSpecialDefenseColor'
})
export class PokemonSpecialDefenseColorPipe implements PipeTransform {

  transform(specialDefense: PokemonSpecialDefense): string {
    let color: string;

    switch (specialDefense) {
      case PokemonSpecialDefense.none:
        color = 'grey lighten-3';
        break;
      case PokemonSpecialDefense.cold:
        color = 'blue lighten-2';
        break;
      case PokemonSpecialDefense.electricity:
        color = 'yellow accent-2';
        break;
      case PokemonSpecialDefense.heat:
        color = 'red lighten-2';
        break;
      case PokemonSpecialDefense.fire:
        color = 'red lighten-1';
        break;
      case PokemonSpecialDefense.poison:
        color = 'green accent-1';
        break;
      case PokemonSpecialDefense.psionicAttack:
        color = 'deep-purple accent-1';
        break;
      default:
        color = 'white';
        break;
    }

    return 'chip ' + color;
  }
}
