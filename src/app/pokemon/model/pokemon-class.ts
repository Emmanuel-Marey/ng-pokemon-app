export enum PokemonClass {
    fighter = 0,
    mage = 1,
    rogue = 2,
    psionist = 3
}

export namespace PokemonClass {
    export function getPokemonClass(pokemonClass: PokemonClass): string {
        let text = '';
        switch (pokemonClass) {
            case PokemonClass.fighter:
                text = "Guerrier";
                break;
            case PokemonClass.mage:
                text = 'Magicien';
                break;
            case PokemonClass.rogue:
                text = "Roublard";
                break;
            case PokemonClass.psionist:
                text = "Psioniste";
                break;
            default:
                text = 'Indéfini';
                break;
        }
        return text;
    }

    export function getPokemonClasses(): number[] {
        const values = Object.keys(PokemonClass).filter((pokemonClass) => !isNaN(Number(pokemonClass)));
        let types = values.map(Number);
        return types;
    }
}