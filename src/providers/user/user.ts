import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserProvider {
  apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(public http: HttpClient) { }

  signup(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/users', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getUser(email: string) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/users?email=' + email)
      .subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }
}

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
}