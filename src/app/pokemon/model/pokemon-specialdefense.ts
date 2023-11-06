export enum PokemonSpecialDefense {
    none = 0,
    cold = 1,
    electricity = 2,
    heat = 3,
    fire = 4,
    poison = 5,
    psionicAttack = 6
}

export namespace PokemonSpecialDefense {
    export function getSpecialDefense(specialDefense: PokemonSpecialDefense): string {
        let text = '';
        switch (specialDefense) {
            case PokemonSpecialDefense.none:
                text = "Aucune";
                break;
            case PokemonSpecialDefense.cold:
                text = "Froid";
                break;
            case PokemonSpecialDefense.electricity:
                text = "Électricité";
                break;
            case PokemonSpecialDefense.heat:
                text = "Chaleur";
                break;
            case PokemonSpecialDefense.fire:
                text = "Feu";
                break;
            case PokemonSpecialDefense.poison:
                text = "Poison";
                break;
            case PokemonSpecialDefense.psionicAttack:
                text = "Attaque psionique";
                break;
            default:
                text = 'Indéfini';
                break;
        }
        return text;
    }

    export function getSpecialDefenses(): number[] {
        const values = Object.keys(PokemonSpecialDefense).filter((type) => !isNaN(Number(type)));
        let types = values.map(Number);
        return types;
    }
}   