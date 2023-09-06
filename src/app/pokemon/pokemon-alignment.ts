export enum PokemonAlignment {
    good = 0,
    neutral = 1,
    evil = 2
}

export namespace PokemonAlignment {
    export function getAlignment(alignment: PokemonAlignment): string {
        let text = '';
        switch (alignment) {
            case PokemonAlignment.good:
                text = "Bon";
                break;
            case PokemonAlignment.neutral:
                text = 'Neutre';
                break;
            case PokemonAlignment.evil:
                text = 'Mauvais';
                break;
            default:
                text = 'Indéfini';
                break;
        }
        return text;
    }

    export function getAlignments(): number[] {
        const values = Object.keys(PokemonAlignment).filter((type) => !isNaN(Number(type)));
        let types = values.map(Number);
        return types;
    }
}