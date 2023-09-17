export enum PokemonMovement {
    normal = 0,
    fly = 1,
    swim = 2
}

export namespace PokemonMovement {
    export function getMovement(movement: PokemonMovement): string {
        let text = '';
        switch (movement) {
            case PokemonMovement.normal:
                text = "Marche";
                break;
            case PokemonMovement.fly:
                text = 'Vol';
                break;
            case PokemonMovement.swim:
                text = 'Nage';
                break;
            default:
                text = 'Indéfini';
                break;
        }
        return text;
    }

    export function getMovements(): number[] {
        const values = Object.keys(PokemonMovement).filter((type) => !isNaN(Number(type)));
        let types = values.map(Number);
        return types;
    }
}