import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, tap, delay } from 'rxjs';
import { addHours, addMinutes } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
class UserToken {
  name: string;
  password: string;
  connected: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER = 'USER';

  constructor(
    private userToken: UserToken,
    private cookieService: CookieService) { }

  public isLoggedIn(): boolean {
    let stringifiedData: any = sessionStorage.getItem(this.USER);
    if (stringifiedData) {
      let parsedJson: any = JSON.parse(stringifiedData);
      return true;
    } else {
      return false;
    }
  }

  public login(name: string, password: string): Observable<boolean> {
    if (this.isLoggedIn()) {
      return of(true);
    } else {
      const isLoggedIn = (name == 'Pichu' && password == 'Pichu');

      return of(isLoggedIn).pipe(
        delay(500),
        tap(isLoggedIn => {
          this.userToken.name = name;
          this.userToken.password = password;
          this.userToken.connected = true;
          sessionStorage.setItem(this.USER, JSON.stringify(this.userToken));

          const date: Date = addMinutes(new Date(), 1);
          this.cookieService.set(this.USER, JSON.stringify(this.userToken), { expires: date });
        })
      );
    }
  }

  public logout(): void {
    console.log('logout()');
    sessionStorage.removeItem(this.USER);
  }
}
