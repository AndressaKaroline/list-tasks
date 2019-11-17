import { IonicPage, NavController, Platform, AlertController, NavParams, ToastController } from 'ionic-angular';
import { TaskProvider, Task } from '../../providers/task/task';
import { Component } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';


@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {
  model: Task;
  key: string;

  data = { title:'', description:'', date:'', time:'' };
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private taskProvider: TaskProvider, private toast: ToastController,
    public localNotifications: LocalNotifications,
    public platform: Platform,
    public alertCtrl: AlertController) {
    if (this.navParams.data.task && this.navParams.data.key) {
      this.model = this.navParams.data.task;
      this.key = this.navParams.data.key;
    } else {
      this.model = new Task();
    }
  }

  save() {
    this.saveTask()
    .then(() => {
      this.toast.create({message: 'Tarefa salva.', duration: 3000, position: 'button'}).present();
    })
    .catch(() =>{
      this.toast.create({message: 'Erro ao salvar a tarefa.', duration: 3000, position: 'button'}).present();
    })
    this.navCtrl.push('ListTaskPage')
  }

  private saveTask() {
    if (this.key) {
      return this.taskProvider.update(this.key, this.model)
    }else{
      return this.taskProvider.insert(this.model)
    }
  }

  submit() {
    console.log(this.data);
    var date = new Date(this.data.date+" "+this.data.time);
    console.log(date);
    this.localNotifications.schedule({
      title: this.data.title,
      text: this.data.description,
      at: date,
      led: 'FF0000',
      sound: this.setSound(),
    });
    let alert = this.alertCtrl.create({
      title: 'Congratulation!',
      subTitle: 'Notification setup successfully at '+date,
      buttons: ['OK']
    });
    alert.present();
    this.data = { title:'', description:'', date:'', time:'' };
  }

  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/Rooster.mp3'
    } else {
      return 'file://assets/sounds/Rooster.caf'
    }
  }
}
