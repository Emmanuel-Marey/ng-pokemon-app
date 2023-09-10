import { PokemonFighter } from "./pokemonFighter";
import { PokemonAlignment } from "./pokemon-alignment";
import { PokemonType } from "./pokemon-type";

export class PokemonFighterViewModel {
    pokemonFighter: PokemonFighter;

    constructor(pokemonFighter: PokemonFighter) {
        this.pokemonFighter = pokemonFighter;
    }

    wound(damage: number): void {
        this.pokemonFighter.currentHitPoints -= damage;
        if (this.pokemonFighter.currentHitPoints < 0) {
            this.pokemonFighter.currentHitPoints == 0;
        }
    }

    getType(type: PokemonType): string {
        return PokemonType.getType(type);
    }

    getAlignment(alignment: PokemonAlignment): string {
        return PokemonAlignment.getAlignment(alignment);
    }
}