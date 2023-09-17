import { AfterViewInit, Component, OnInit } from '@angular/core';

import * as M from "materialize-css";
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(
    private authService: AuthService, 
    private router: Router)
  { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    var modalList = document.querySelectorAll('.modal');
    console.log('modalList: ' + modalList[0].id);
    M.Modal.init(modalList, {});
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
