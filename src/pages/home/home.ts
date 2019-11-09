import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { Calendar, CalendarOriginal } from '@ionic-native/calendar';
 
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  calendars = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private calendar: CalendarOriginal, private plt: Platform) {
    this.plt.ready().then(() => {
      this.calendar.listCalendars().then(data => {
        this.calendars = data;
      });
    })
  }

  addEvent(cal) {
    let date = new Date();
    let options = { calendarId: cal.id, calendarName: cal.name, url: 'https://ionicacademy.com', firstReminderMinutes: 15 };
 
    this.calendar.createEventInteractivelyWithOptions('My new Event', 'Münster', 'Special Notes', date, date, options).then(res => {
    }, err => {
      console.log('err: ', err);
    });
  }
 
  openCal(cal) {
    this.navCtrl.push('CalDetailsPage', { name: cal.name })
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
