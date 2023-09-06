import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="center">
      <h1>Cette page n'existe pas!</h1>
      <img src="assets/error-404.png"/>
      <a routerLink="/pokemons" class="waves-effect waves-teal btn-flat">
        Retour à l'accueil
      </a>
    </div>
  `,
  styles: [
  ]
})
export class PageNotFoundComponent { }
