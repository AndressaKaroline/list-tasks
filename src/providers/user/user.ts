import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const STORAGE_KEY = 'users';

@Injectable()
export class UserProvider {

  constructor(public storage: Storage) { }

  public createUser(data) {
    return this.getUsers().then(result => {
      if (result) {
        data['id'] = result.length + 1;
        result.push(data);
        return this.storage.set(STORAGE_KEY, result);
        } else {
        data['id'] = 1;
          return this.storage.set(STORAGE_KEY, [data]);
        }
    });
  }

  public remove(id: string) {
    return this.storage.remove(id);
  }

  public getUsers() {
    return this.storage.get(STORAGE_KEY);
  }
}

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}