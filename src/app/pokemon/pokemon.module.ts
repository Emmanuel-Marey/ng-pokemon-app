import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPokemonsComponent } from './components/list-pokemons/list-pokemons.component';
import { DetailPokemonComponent } from './components/detail-pokemon/detail-pokemon.component';
import { BorderLargeCardDirective } from './directives/border-large-card.directive';
import { BorderSmallCardDirective } from './directives/border-small-card.directive';
import { BorderFighterCardDirective } from './directives/border-fighter-card.directive';
import { BorderUnknownFighterCardDirective } from './directives/border-unknown-fighter-card.directive'
import { PokemonTypeColorPipe } from './pipes/pokemon-type-color.pipe';
import { PokemonSpecialAbilityColorPipe } from './pipes/pokemon-specialability-color.pipe';
import { PokemonSpecialDefenseColorPipe } from './pipes/pokemon-specialdefense-color.pipe';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PokemonFormComponent } from './components/pokemon-form/pokemon-form.component';
import { EditPokemonComponent } from './components/edit-pokemon/edit-pokemon.component';
import { PokemonService } from './service/pokemon.service';
import { AddPokemonComponent } from './components/add-pokemon/add-pokemon.component';
import { LoaderComponent } from '../loader/loader.component';
import { SearchPokemonComponent } from './components/search-pokemon/search-pokemon.component';
import { PokemonAlignmentColorPipe } from './pipes/pokemon-alignment-color.pipe';
import { authGuard } from '../login/service/auth.guard';
import { AuthService } from '../login/service/auth.service';
import { FightPokemonFormComponent } from './components/fight-pokemon-form/fight-pokemon-form.component';
import { TournamentComponent } from './components/tournament-form/tournament.component';

const pokemonRoutes: Routes = [
  { path: 'edit/pokemon/:id', component: EditPokemonComponent, canActivate: [authGuard] },
  { path: 'pokemons', component: ListPokemonsComponent, canActivate: [authGuard] },
  { path: 'pokemon/:id', component: DetailPokemonComponent, canActivate: [authGuard] },
  { path: 'fight', component: FightPokemonFormComponent, canActivate: [authGuard] },
  { path: 'tournament', component: TournamentComponent, canActivate: [authGuard] }
];

@NgModule({
  declarations: [
    ListPokemonsComponent,
    DetailPokemonComponent,
    BorderLargeCardDirective,
    BorderSmallCardDirective,
    BorderFighterCardDirective,
    BorderUnknownFighterCardDirective,
    PokemonTypeColorPipe,
    PokemonAlignmentColorPipe,
    PokemonSpecialAbilityColorPipe,
    PokemonSpecialDefenseColorPipe,
    PokemonFormComponent,
    EditPokemonComponent,
    AddPokemonComponent,
    FightPokemonFormComponent,
    LoaderComponent,
    SearchPokemonComponent,
    TournamentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(pokemonRoutes)
  ],
  providers: [
    AuthService,
    PokemonService
  ]
})
export class PokemonModule {
}
