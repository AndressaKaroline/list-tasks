import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { DateTime } from 'ionic-angular';

@Injectable()
export class TaskProvider {

  constructor(private storage: Storage, private datepipe: DatePipe) {
  
  }

  public insert(task: Task){
    let key = this.datepipe.transform(new Date, "ddMMyyyyHHmmss")
    return this.save(key, task);
  }

  public update(key: string, task: Task){
    return this.save(key, task);
  }

  private save(key: string, task: Task){
    return this.storage.set(key, task)
  }

  public remove(key: string){
    return this.storage.remove(key);
  }

  public getAll(){
    let tasks: TaskList[] = [];
    this.storage.forEach((value: Task, key: string, itrationNumber: Number) => {
      let task = new TaskList(); 
      task.key = key;
      task.task = value;
      tasks.push(task);
    })
    .then(() => {
      return Promise.resolve(tasks);
    })
    .catch((error) => {
      return Promise.reject(error);
    })
  }
}

export class Task{
  //user: Usuario
  name: String;
  description: String;
  date: DateTime;
}

export class TaskList {
  key: string;
  task: Task;
}
