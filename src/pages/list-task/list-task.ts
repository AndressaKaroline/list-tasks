import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Toast } from 'ionic-angular';
import { TaskProvider, TaskList } from '../../providers/task/task';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Calendar } from '@ionic-native/calendar';

//import { TaskPage } from '../task/task';

@IonicPage()
@Component({
  selector: 'page-list-task',
  templateUrl: 'list-task.html',
})
export class ListTaskPage {
  tasks: TaskList[];
  public title: string;
  public note: string;
  public startDate: Date;
  public endDate: Date;
  public titleUpdated: string;
  public noteUpdated: string;
  private nav: NavController;

  constructor(nav: NavController, public navParams: NavParams, public calendar: Calendar,
    private taskProvider: TaskProvider, private toast: ToastController, public localNotifications: LocalNotifications) {
    this.nav = nav;
  }

  calender() {
    this.startDate = new Date();
    this.startDate.setMinutes(this.startDate.getMinutes() + 10);
    this.calendar.createCalendar('MyCalendar').then(
      (msg) => { console.log(msg); },
      (err) => { console.log(err); }
    );
    this.calendar.openCalendar(this.startDate);
  }

  public deleteEvent(title:any, location:any, notes:any, startDate:any, endDate:any):void{
    this.calendar.deleteEvent(title, location, notes, startDate, endDate)
  }

  ionViewDidEnter() {
    this.taskProvider.getAll()
      .then(results => {
        this.tasks = results;
      })
  }

  addTask(item: TaskList) {
    this.nav.push('TaskPage')
  }

  editTask(item: TaskList) {
    this.localNotifications.clear(item.key)
    var date = new Date(item.task.date + " " + item.task.time);
    this.deleteEvent(item.task.name, null, item.task.description, date, date)
    this.nav.push('TaskPage', { key: item.key, task: item.task });
  }

  showTask(item: TaskList) {
    this.nav.push('ShowTaskPage', { key: item.key, task: item.task });
  }

  removeTask(item: TaskList) {
    var date = new Date(item.task.date + " " + item.task.time);
    this.deleteEvent(item.task.name, null, item.task.description, date, date)
    this.localNotifications.clear(item.key)
    this.taskProvider.remove(item.key)
      .then(() => {
        let index = this.tasks.indexOf(item);
        this.tasks.splice(index, 1);
        this.toast.create({ message: 'Tarefa removida.', duration: 3000, position: 'botton' }).present();
      })
  }

}
