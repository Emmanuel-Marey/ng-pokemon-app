import { Pokemon } from "./pokemon";

export class Fighter extends Pokemon {

    team: number;
    currentHitPoints: number;

    isDead(): boolean {
        return this.currentHitPoints == 0;
    }
}