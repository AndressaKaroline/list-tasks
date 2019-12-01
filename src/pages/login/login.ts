import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { UserProvider, User } from '../../providers/user/user';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  model: User;

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public userProvider: UserProvider,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
      this.model = new User();
      this.model.email = 'test@gmail.com';
      this.model.password = 'test';
  }

  doLogin() {
    console.log(this.model.email + " - " + this.model.password);
    this.userProvider.getUser(this.model.email)
      .then((result: any) => {
        console.log(result.email)
        if(result.password == this.model.password) {
          this.toastCtrl.create({ message: 'Usuário logado com sucesso.', position: 'botton', duration: 3000 }).present();
          this.navCtrl.push('MainPage', {
            user: result
          });
        } else {
          this.toastCtrl.create({ message: 'Senha incorreta!', position: 'botton', duration: 3000})
        }
        //Salvar o token no Ionic Storage para usar em futuras requisições.
        //Redirecionar o usuario para outra tela usando o navCtrl
        //this.navCtrl.pop();
        //this.navCtrl.setRoot()
      })
      .catch((error: any) => {
        this.toastCtrl.create({ message: 'Erro ao efetuar login. Verifique o email', position: 'botton', duration: 3000 }).present();
      });
  }
}
