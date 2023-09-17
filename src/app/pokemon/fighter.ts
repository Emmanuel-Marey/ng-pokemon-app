import { Pokemon } from "./pokemon";

export class Fighter {
    pokemon: Pokemon;
    team: number;
    currentHitPoints: number;

    constructor(private _pokemon: Pokemon) { 
        this.pokemon = this._pokemon;
    }

    isDead(): boolean {
        return this.currentHitPoints == 0;
    }
}