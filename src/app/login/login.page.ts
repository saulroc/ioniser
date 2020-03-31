import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import {ToastService} from '../services/toast.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userName: string;
  password: string;
  urlFoto: string;
  isAuthenticated: boolean;

  constructor(private router: Router,
    private afa: AngularFireAuth,
    private toast: ToastService) { 

    }

  ngOnInit() {
    this.afa.authState.subscribe(user => {
      if (!user) {
        this.userName = "Player 1";
        this.urlFoto = "";
        this.isAuthenticated = false;
        return
      }
      this.isAuthenticated = true;
      this.userName = user.displayName ? user.displayName : user.email;
      this.urlFoto = user.photoURL;
  });
  }

  loginFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
      'display': 'popup'
    });
    //this.afa.auth.signInWithPopup(firebase.auth.FacebookAuthProvider)
    this.afa.auth.signInWithPopup(provider).then(result => {
      
      //var token = result.user.getIdToken;
      var user = result.user;
      this.router.navigate(["high-score"]);
      // ...
    }).catch(error => {
      const errorMessage = error.message;
      this.toast.present(errorMessage);
    });
  }

  login() {
    var provider = new firebase.auth.EmailAuthProvider();
    
    this.afa.auth.signInWithEmailAndPassword(this.userName,this.password).then(result => {
      
      //var token = result.user.getIdToken;
      var user = result.user;
      this.router.navigate(["high-score"]);
      
    }).catch(error => {
      const errorMessage = error.message;
      this.toast.present(errorMessage);
    });
  }

  logout() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  register() {
    firebase.auth().createUserWithEmailAndPassword('saulrocx@gmail.com','123456')
    .then(userCredential => {
      userCredential.user.sendEmailVerification();
      console.log("Register-then", userCredential);
    })
    .catch(error => console.log("REGISTER-ERROR", error));
  }
}
