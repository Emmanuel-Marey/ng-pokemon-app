import { Pokemon } from "./pokemon";
import { PokemonAlignment } from "./pokemon-alignment";
import { PokemonType } from "./pokemon-type";

export class PokemonFighter extends Pokemon {

    team: number;
    currentHitPoints: number;

    getType(type: PokemonType): string {
        return PokemonType.getType(type);
    }

    getAlignment(alignment: PokemonAlignment): string {
        return PokemonAlignment.getAlignment(alignment);
    }
}