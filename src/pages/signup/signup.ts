import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { UserProvider, User } from '../../providers/user/user';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  model: User;

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public userProvider: UserProvider, public toastCtrl: ToastController, 
    public translateService: TranslateService) {
      this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
        this.signupErrorString = value;
      })
      this.model = new User();
      this.model.name = 'test';
      this.model.email = 'test@gmail.com';
      this.model.password = 'test';
  }

  doSignup() {
    this.userProvider.signup(this.model).then((result: any) => {
        this.toastCtrl.create({ message: 'Usuário criado com sucesso.', position: 'botton', duration: 3000 }).present(); 
        this.navCtrl.push(MainPage, {
          user: result
        });
      })
      .catch((error: any) => {
        this.toastCtrl.create({ message: 'Erro ao criar o usuário. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
      });
  }
}
