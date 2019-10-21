import { Injectable } from '@angular/core';

import { Task } from '../../models/task';

@Injectable()
export class Tasks {
  tasks: Task[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };


  constructor() {
    let tasks = [
      {
        "name": "Burt Bear",
        "profilePic": "assets/img/speakers/bear.jpg",
        "about": "Burt is a Bear."
      },
      {
        "name": "Charlie Cheetah",
        "profilePic": "assets/img/speakers/cheetah.jpg",
        "about": "Charlie is a Cheetah."
      },
      {
        "name": "Donald Duck",
        "profilePic": "assets/img/speakers/duck.jpg",
        "about": "Donald is a Duck."
      },
      {
        "name": "Eva Eagle",
        "profilePic": "assets/img/speakers/eagle.jpg",
        "about": "Eva is an Eagle."
      },
      {
        "name": "Ellie Elephant",
        "profilePic": "assets/img/speakers/elephant.jpg",
        "about": "Ellie is an Elephant."
      },
      {
        "name": "Molly Mouse",
        "profilePic": "assets/img/speakers/mouse.jpg",
        "about": "Molly is a Mouse."
      },
      {
        "name": "Paul Puppy",
        "profilePic": "assets/img/speakers/puppy.jpg",
        "about": "Paul is a Puppy."
      }
    ];

    for (let task of tasks) {
      this.tasks.push(new Task(task));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.tasks;
    }

    return this.tasks.filter((task) => {
      for (let key in params) {
        let field = task[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return task;
        } else if (field == params[key]) {
          return task;
        }
      }
      return null;
    });
  }

  add(task: Task) {
    this.tasks.push(task);
  }

  delete(task: Task) {
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }
}
