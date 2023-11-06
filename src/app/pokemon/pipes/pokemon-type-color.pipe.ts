import { Pipe, PipeTransform } from '@angular/core';
import { PokemonType } from '../model/pokemon-type';

@Pipe({
  name: 'pokemonTypeColor'
})
export class PokemonTypeColorPipe implements PipeTransform {

  transform(type: PokemonType): string {
    let color: string;

    switch (type) {
      case PokemonType.animal:
        color = 'blue';
        break;
      case PokemonType.artificial:
        color = 'purple';
        break;
      case PokemonType.dragon:
        color = 'red';
        break;
      case PokemonType.elemental:
        color = 'teal';
        break;
      case PokemonType.fey:
        color = 'amber';
        break;
      case PokemonType.plant:
        color = 'green';
        break;
      case PokemonType.prehistoric:
        color = 'cyan';
        break;
      case PokemonType.undead:
        color = 'grey';
        break;
      case PokemonType.vermin:
        color = 'brown lighten-3';
        break;
      default:
        color = 'white';
        break;
    }

    return 'chip ' + color;
  }
}
