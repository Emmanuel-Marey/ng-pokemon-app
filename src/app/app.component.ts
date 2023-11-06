import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from './login/service/auth.service';
import { Router } from '@angular/router';
import { PokemonInMemoryDbService } from './pokemon/service/pokemon-in-memory-db.service';

import * as M from "materialize-css";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private pokemonInMemoryDbService: PokemonInMemoryDbService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    var modalList = document.querySelectorAll('.modal');
    console.log('AppComponent.ngAfterViewInit: list of modal forms: ' + modalList[0].id);
    M.Modal.init(modalList, {});
  }

  logout() {
    this.pokemonInMemoryDbService.saveDb();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
