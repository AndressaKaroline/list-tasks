import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ShowTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-task',
  templateUrl: 'show-task.html',
})
export class ShowTaskPage {

  title: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title = navParams.get('task');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowTaskPage');
  }

}
