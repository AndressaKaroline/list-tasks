import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

/**
 * Generated class for the LoginfacebookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loginfacebook',
  templateUrl: 'loginfacebook.html',
})
export class LoginfacebookPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public facebook: Facebook) {
  }

  loginFacebook() {
    let permissions = new Array<string>();
    permissions = ["public_profile", "email"];

    this.facebook.login(permissions).then((response) => {
     let params = new Array<string>();

     this.facebook.api("/me?fields=name,email", params)
     .then(res => {

         //estou usando o model para criar os usuarios
         let usuario = new Usuario();
         usuario.nome = res.name;
         usuario.email = res.email;
         usuario.senha = res.id;
         usuario.login = res.email;
       
         this.logar(usuario);
     }, (error) => {
       alert(error);
       console.log('ERRO LOGIN: ',error);
     })
   }, (error) => {
     alert(error);
   });
  }

  logar(usuario: Usuario) {
  //  this.salvarService.salvarFacebook(usuario)
  //  .then(() => {
  //      console.log('Usuario cadastrado via facebook com sucesso!');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginfacebookPage');
  }
}

export class Model {
  constructor(objeto?) {
      Object.assign(this, objeto);
  }
}

export class Usuario extends Model {
    codigo: number;
    nome: string;
    email: string;
    login: string;
    senha: string;
}
