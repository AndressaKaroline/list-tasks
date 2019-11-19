import { IonicPage, NavController, Platform, AlertController, NavParams, ToastController, Form } from 'ionic-angular';
import { TaskProvider, Task } from '../../providers/task/task';
import { Component } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {
  data: Task;
  key: string;
  registerForm: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  private taskProvider: TaskProvider, private toast: ToastController,
  public localNotifications: LocalNotifications,
  public platform: Platform,
  public alertCtrl: AlertController,
  public formbuilder: FormBuilder) {
    this.registerForm = this.formbuilder.group({
      name:[null, [Validators.required]],
      description:[null, [Validators.required, Validators.maxLength(50)]],
      date:[null, [Validators.required]],
      time:[null, [Validators.required]]
    })

    if (this.navParams.data.task && this.navParams.data.key) {
      this.data = this.navParams.data.task;
      this.key = this.navParams.data.key;
    } else {
      this.data = new Task();
    }
  }

  save() {
    console.log(this.data)
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
      return this.taskProvider.update(this.key, this.data)
    }else{
      return this.taskProvider.insert(this.data)
    }
  }

  submit() {
    var date = new Date(this.data.date+" "+this.data.time);
    this.localNotifications.schedule({
      title: this.data.name,
      text: this.data.description,
      at: date,
      led: 'FF0000',
      sound: this.setSound(),
      smallIcon: 'res://icon',
      icon: 'file://assets/img/icon.png'
    });
    let alert = this.alertCtrl.create({
      title: 'Ok!',
      subTitle: 'Configuração de notificação salva com êxito em '+date,
      buttons: ['OK']
    });
    alert.present();
  }

  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/Rooster.mp3'
    } else {
      return 'file://assets/sounds/Rooster.caf'
    }
  }
}
