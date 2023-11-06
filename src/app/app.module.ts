import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonModule } from './pokemon/pokemon.module';
import { FormsModule } from '@angular/forms';
import { DisableRightClickDirective } from './disable-right-click.directive';
import { ToastrModule } from 'ngx-toastr';
import { PokemonInMemoryDbService } from './pokemon/service/pokemon-in-memory-db.service';
import { LoginComponent } from './login/components/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { DocumentationComponent } from './documentation/documentation.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DisableRightClickDirective,
    LoginComponent,
    DocumentationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(PokemonInMemoryDbService, { delay: 500, dataEncapsulation: false }),
    PokemonModule,
    AppRoutingModule,
    ToastrModule.forRoot()
  ],
  exports: [
    DisableRightClickDirective
  ],
  providers: [
    CookieService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
