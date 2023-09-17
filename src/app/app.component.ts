import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MemoryDatabaseService } from './memory-database.service';

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
    private memoryDatabaseService: MemoryDatabaseService)
  { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    var modalList = document.querySelectorAll('.modal');
    console.log('modalList: ' + modalList[0].id);
    M.Modal.init(modalList, {});
  }

  logout() {
    this.memoryDatabaseService.saveDb();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
