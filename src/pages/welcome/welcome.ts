import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

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

  constructor(public navCtrl: NavController, public fb: Facebook) { 
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  loginFB() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        if(res.status === "conected") {
          this.user.img = "https://graph.facebook.com/" + res.authResponse.userID + "/picture?type=square";
        } else {
          alert("Login failed!");
        } console.log('Logged into Facebook!', res)
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }
}
