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
    this.model.passwordConfirm = 'test';
  }

  doSignup() {
    var data = {
      'name': this.model.name,
      'email': this.model.email,
      'password': this.model.password,
      'passwordConfirm': this.model.passwordConfirm
    };

    if (this.model.password != this.model.passwordConfirm) {
      this.toastCtrl.create({ message: 'A senha e confirmação de senha precisa ser iguais.', position: 'botton', duration: 3000 }).present();
    } else {
      this.userProvider.createUser(data)
        .then((result: any) => {
          this.toastCtrl.create({ message: 'Usuário criado com sucesso.', position: 'botton', duration: 3000 }).present();
          this.navCtrl.push(MainPage, {
            user: data
          })
        })
        .catch((error: any) => {
          this.toastCtrl.create({ message: 'Erro ao criar usuário.', position: 'botton', duration: 3000 }).present();
        });
    }
  }
}
