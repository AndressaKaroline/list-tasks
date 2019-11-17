import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TaskProvider, TaskList } from '../../providers/task/task';


@IonicPage()
@Component({
  selector: 'page-list-task',
  templateUrl: 'list-task.html',
})
export class ListTaskPage {
  tasks: TaskList[];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private taskProvider: TaskProvider, private toast: ToastController) {
  }

  ionViewDidEnter() {
    this.taskProvider.getAll()
      .then(results => {
        this.tasks = results;
      })
  }

  addTask(){
    this.navCtrl.push('TaskPage')
  }

  editTask(item: TaskList){
    this.navCtrl.push('TaskPage', { key: item.key, task: item.task});
  }

  removeTask(item: TaskList){
    this.taskProvider.remove(item.key)
    .then(() => {
      let index = this.tasks.indexOf(item);
      this.tasks.splice(index, 1);
      this.toast.create({message: 'Tarefa removida.', duration: 3000, position:'botton'}).present();
    })
  }

}
