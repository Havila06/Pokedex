import { Injectable, signal } from "@angular/core";
import { delay, Observable, of } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // readonly #isloggedIn = signal(false);
    // readonly isloggedIn = this.#isloggedIn.asReadonly();

    // login(name: string, password: string): Observable<boolean>{
    //     const isloggedIn = name == 'Pikachu' && password == 'Pikachu#';

    //     this.#isloggedIn.set(isloggedIn);
    //     return of(isloggedIn).pipe(delay(1000));
    // }
}
