export enum PokemonType {
    animal = 0,
    artificial = 1,
    dragon = 2,
    elemental = 3,
    fey = 4,
    plant = 5,
    prehistoric = 6,
    undead = 7,
    vermin = 8
}

export namespace PokemonType {
    export function getPokemonType(type: PokemonType): string {
        let text = '';
        switch (type) {
            case PokemonType.animal:
                text = "Animal";
                break;
            case PokemonType.artificial:
                text = 'Artificiel';
                break;
            case PokemonType.prehistoric:
                text = 'Préhistorique';
                break;
            case PokemonType.dragon:
                text = "Dragon";
                break;
            case PokemonType.elemental:
                text = 'Élémentaire';
                break;
            case PokemonType.fey:
                text = 'Fée';
                break;
            case PokemonType.plant:
                text = 'Plante';
                break;
            case PokemonType.undead:
                text = 'Mort-vivant';
                break;
            case PokemonType.vermin:
                text = 'Vermine';
                break;
            default:
                text = 'Indéfini';
                break;
        }
        return text;
    }

    export function getPokemonTypes(): number[] {
        const values = Object.keys(PokemonType).filter((type) => !isNaN(Number(type)));
        let types = values.map(Number);
        return types;
    }
}
