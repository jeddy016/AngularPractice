import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable ()
export class AuthService {
    currentUser: IUser;

    constructor(private http: HttpClient) {}

    loginUser(userName: string, password: string) {
        const options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
        const loginInfo = {
             username: userName,
             password: password,
         };

        return this.http.post('/api/login', loginInfo, options)
            .pipe(tap(data => {
                this.currentUser = <IUser>data['user'];
            }))
            .pipe(catchError(err => {
                return of(false);
            }));
    }

    logOutUser() {
        const options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
        this.currentUser = undefined;
        return this.http.post('/api/logout', {}, options);
    }

    updateCurrentUser(firstName: string, lastName: string) {
        const options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};

        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;
        return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    checkAuthStatus() {
        this.http.get('/api/currentIdentity')
            .pipe(tap(data => {
                if (data instanceof Object) {
                    this.currentUser = <IUser>data;
                }
            }))
            .subscribe();
    }
}
