import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListTaskPage } from './list-task';

@NgModule({
  declarations: [
    ListTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(ListTaskPage),
  ],
})
export class ListTaskPageModule {}
