import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { ApiLogin } from '../api/apiLogin';

@Injectable()
export class Items {

  constructor(public api: ApiLogin) { }

  query(params?: any) {
    return this.api.get('/items', params);
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

}
