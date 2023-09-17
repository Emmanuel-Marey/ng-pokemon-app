import { Pipe, PipeTransform } from '@angular/core';
import { PokemonAlignment } from '../parameters/pokemon-alignment';

@Pipe({
  name: 'pokemonAlignmentColor'
})
export class PokemonAlignmentColorPipe implements PipeTransform {

  transform(alignment: PokemonAlignment): string {
    let color: string;

    switch (alignment) {
      case PokemonAlignment.good:
        color = 'light-green accent-3';
        break;
      case PokemonAlignment.neutral:
        color = 'yellow accent-2';
        break;
      case PokemonAlignment.evil:
        color = 'red lighten-1';
        break;
      default:
        color = 'white';
        break;
    }

    return 'chip ' + color;
  }
}
