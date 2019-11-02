import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { MainPage } from '../pages';
import { HttpClient } from '@angular/common/http';
/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  user: any = {};
  userData: string;

  constructor(public navCtrl: NavController, public fb: Facebook, public toastCtrl: ToastController, private http: HttpClient) { 
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  loginFB() {
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        if(res.status === "connected") {
          this.navCtrl.push(MainPage);
          this.getData(res.authResponse.accessToken);
          // this.user.img = "https://graph.facebook.com/" + res.authResponse.userID + "/picture?type=square";
        } else {
          alert("Login failed!");
        } console.log('Logged into Facebook!', res)
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  getData(access_token: string) {
    let url = "https://graph.facebook.com/me?fields=id,name,first_name,last_name,email&access_token=" + access_token;
    this.http.get(url).subscribe(data => {
      this.userData = JSON.stringify(data)
      console.log(data);
    });
  }
}
