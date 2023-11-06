export enum PokemonSpecialAbility {
    cold = 0,
    severeCold = 1,
    coldBreath = 2,
    electricity = 3,
    lightning = 4,
    electricArc = 5,
    lightningChain = 6,
    fire = 7,
    intenseFire = 8,
    fireBreath = 9,
    hotWater = 10,
    heatWater = 11,
    burningVapors = 12,
    benignPoison = 13,
    poison = 14,
    virulentPoison = 15,
    deadlyPoison = 16,
    darkness = 17,
    deepDarkness = 18,
    energyAbsorption = 19,
    death = 20,
    fighter = 21,
    expertFighter = 22,
    masterSwordsman = 23,
    champion = 24,
    apprenticeMagicUser = 25,
    magicUser = 26,
    mage = 27,
    archmage = 28,
    psionist = 29,
    psychicShield = 30,
    mentalExplosion = 31,
}

export type SpecialAbility = {
    specialAbility: PokemonSpecialAbility,
    damage?: number,
    times?: number,
    attack?: number,
    defense?: number,
}

export type SpecialAbilities = Array<SpecialAbility>;

export const SPECIAL_ABILITIES: SpecialAbility[] = [
    { specialAbility: PokemonSpecialAbility.cold, damage: 2 },
    { specialAbility: PokemonSpecialAbility.severeCold, damage: 4 },
    { specialAbility: PokemonSpecialAbility.coldBreath, damage: 8, times: 1 },
    { specialAbility: PokemonSpecialAbility.electricity, damage: 2 },
    { specialAbility: PokemonSpecialAbility.lightning, damage: 4 },
    { specialAbility: PokemonSpecialAbility.electricArc, damage: 7, times: 2 },
    { specialAbility: PokemonSpecialAbility.lightningChain, damage: 10, times: 1 },
    { specialAbility: PokemonSpecialAbility.fire, damage: 2 },
    { specialAbility: PokemonSpecialAbility.intenseFire, damage: 4 },
    { specialAbility: PokemonSpecialAbility.fireBreath, damage: 12, times: 1 },
    { specialAbility: PokemonSpecialAbility.hotWater, damage: 2 },
    { specialAbility: PokemonSpecialAbility.heatWater, damage: 4 },
    { specialAbility: PokemonSpecialAbility.burningVapors, damage: 10, times: 1 },
    { specialAbility: PokemonSpecialAbility.benignPoison, damage: 1 },
    { specialAbility: PokemonSpecialAbility.poison, damage: 3 },
    { specialAbility: PokemonSpecialAbility.virulentPoison, damage: 5 },
    { specialAbility: PokemonSpecialAbility.deadlyPoison, damage: 7 },
    { specialAbility: PokemonSpecialAbility.darkness, defense: 2 },
    { specialAbility: PokemonSpecialAbility.deepDarkness, defense: 4 },
    { specialAbility: PokemonSpecialAbility.energyAbsorption, damage: 4 },
    { specialAbility: PokemonSpecialAbility.death, damage: 8 },
    { specialAbility: PokemonSpecialAbility.fighter, damage: 1, attack: 2 },
    { specialAbility: PokemonSpecialAbility.expertFighter, damage: 2, attack: 3 },
    { specialAbility: PokemonSpecialAbility.masterSwordsman, damage: 3, attack: 4 },
    { specialAbility: PokemonSpecialAbility.champion, damage: 4, attack: 4 },
    { specialAbility: PokemonSpecialAbility.apprenticeMagicUser, damage: 2 },
    { specialAbility: PokemonSpecialAbility.magicUser, damage: 3, defense: 1 },
    { specialAbility: PokemonSpecialAbility.mage, damage: 4, defense: 2 },
    { specialAbility: PokemonSpecialAbility.archmage, damage: 6, defense: 4 },
    { specialAbility: PokemonSpecialAbility.psionist, damage: 3, attack: 2 },
    { specialAbility: PokemonSpecialAbility.psychicShield, defense: 4 },
    { specialAbility: PokemonSpecialAbility.mentalExplosion, damage: 10, times: 1 },
]

export namespace PokemonSpecialAbility {
    export function getSpecialAbility(specialAbility: PokemonSpecialAbility): string {
        let text = '';
        switch (specialAbility) {
            case PokemonSpecialAbility.cold:
                text = "Froid";
                break;
            case PokemonSpecialAbility.severeCold:
                text = "Froid intense";
                break;
            case PokemonSpecialAbility.coldBreath:
                text = "Souffle glacial";
                break;
            case PokemonSpecialAbility.electricity:
                text = "Décharge électrique";
                break;
            case PokemonSpecialAbility.lightning:
                text = "Éclair de foudre";
                break;
            case PokemonSpecialAbility.electricArc:
                text = "Arc électrique";
                break;
            case PokemonSpecialAbility.lightningChain:
                text = "Chaîne d'éclairs";
                break;
            case PokemonSpecialAbility.fire:
                text = "Feu";
                break;
            case PokemonSpecialAbility.intenseFire:
                text = "Feu intense";
                break;
            case PokemonSpecialAbility.fireBreath:
                text = "Souffle de feu";
                break;
            case PokemonSpecialAbility.hotWater:
                text = "Jet d'eau chaude";
                break;
            case PokemonSpecialAbility.heatWater:
                text = "Jet d'eau brûlante";
                break;
            case PokemonSpecialAbility.burningVapors:
                text = "Vapeurs brûlantes";
                break;
            case PokemonSpecialAbility.benignPoison:
                text = "Poison bénin";
                break;
            case PokemonSpecialAbility.poison:
                text = "Poison";
                break;
            case PokemonSpecialAbility.virulentPoison:
                text = "Poison virulent";
                break;
            case PokemonSpecialAbility.deadlyPoison:
                text = "Poison mortel";
                break;
            case PokemonSpecialAbility.darkness:
                text = "Ténèbres";
                break;
            case PokemonSpecialAbility.deepDarkness:
                text = "Ténèbres profondes";
                break;
            case PokemonSpecialAbility.energyAbsorption:
                text = "Absorption d'énergie";
                break;
            case PokemonSpecialAbility.death:
                text = "Mort";
                break;
            case PokemonSpecialAbility.fighter:
                text = "Guerrier";
                break;
            case PokemonSpecialAbility.expertFighter:
                text = "Guerrier expert";
                break;
            case PokemonSpecialAbility.masterSwordsman:
                text = "Maitre d'arme";
                break;
            case PokemonSpecialAbility.champion:
                text = "Champion";
                break;
            case PokemonSpecialAbility.apprenticeMagicUser:
                text = "Apprenti-magicien";
                break;
            case PokemonSpecialAbility.magicUser:
                text = "Magicien";
                break;
            case PokemonSpecialAbility.mage:
                text = "Mage";
                break;
            case PokemonSpecialAbility.archmage:
                text = "Archi-mage";
                break;
            case PokemonSpecialAbility.psionist:
                text = "Psioniste";
                break;
            case PokemonSpecialAbility.psychicShield:
                text = "Bouclier psychique";
                break;
            case PokemonSpecialAbility.mentalExplosion:
                text = "Explosion mentale";
                break;
            default:
                text = 'Indéfini';
                break;
        }
        return text;
    }

    export function getSpecialAbilities(): number[] {
        const values = Object.keys(PokemonSpecialAbility).filter((type) => !isNaN(Number(type)));
        let types = values.map(Number);
        return types;
    }

    export function toString(specialAbility: SpecialAbility): string {
        let s: string = getSpecialAbility(specialAbility.specialAbility);
        return s;
    }
}   