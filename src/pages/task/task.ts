import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BoundTextAst } from '@angular/compiler';
import { TaskProvider, Task } from '../../providers/task/task';


@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {
  model: Task;
  key: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private taskProvider: TaskProvider, private toast: ToastController) {
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
  }

  private saveTask() {
    if (this.key) {
      return this.taskProvider.update(this.key, this.model)
    }else{
      return this.taskProvider.insert(this.model)
    }
  }
}
