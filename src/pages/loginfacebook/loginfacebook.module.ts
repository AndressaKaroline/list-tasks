import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginfacebookPage } from './loginfacebook';

@NgModule({
  declarations: [
    LoginfacebookPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginfacebookPage),
  ],
})
export class LoginfacebookPageModule {}
