import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPokemonsComponent } from './list-pokemons/list-pokemons.component';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';
import { BorderLargeCardDirective } from './directives/border-large-card.directive';
import { BorderSmallCardDirective } from './directives/border-small-card.directive';
import { BorderFighterCardDirective } from './directives/border-fighter-card.directive';
import { BorderUnknownFighterCardDirective } from './directives/border-unknown-fighter-card.directive'
import { PokemonTypeColorPipe } from './pipes/pokemon-type-color.pipe';
import { PokemonSpecialAbilityColorPipe } from './pipes/pokemon-specialability-color.pipe';
import { PokemonSpecialDefenseColorPipe } from './pipes/pokemon-specialdefense-color.pipe';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';
import { PokemonService } from './pokemon.service';
import { AddPokemonComponent } from './add-pokemon/add-pokemon.component';
import { LoaderComponent } from '../loader/loader.component';
import { SearchPokemonComponent } from './search-pokemon/search-pokemon.component';
import { PokemonAlignmentColorPipe } from './pipes/pokemon-alignment-color.pipe';
import { authGuard } from '../auth.guard';
import { AuthService } from '../auth.service';
import { FightFormComponent } from './fight-form/fight-form.component';

const pokemonRoutes: Routes = [
  { path: 'edit/pokemon/:id', component: EditPokemonComponent, canActivate: [authGuard] },
  { path: 'pokemons', component: ListPokemonsComponent, canActivate: [authGuard] },
  { path: 'pokemon/:id', component: DetailPokemonComponent, canActivate: [authGuard] },
  { path: 'fight', component: FightFormComponent, canActivate: [authGuard] }
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
    FightFormComponent,
    LoaderComponent,
    SearchPokemonComponent
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
