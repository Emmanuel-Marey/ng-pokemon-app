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
import { MemoryDatabaseService } from './memory-database.service';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { InlineDocumentationComponent } from './inline-documentation/inline-documentation.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DisableRightClickDirective,
    LoginComponent,
    InlineDocumentationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(MemoryDatabaseService, { delay: 500, dataEncapsulation: false }),
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
