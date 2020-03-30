import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import * as firebase from 'firebase';

import 'firebase/auth';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router,
    private toast: ToastService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route);

    let authInfo = {
      authenticated: false
    };
    if (firebase.auth().currentUser)
      authInfo.authenticated = true;

    if (!authInfo.authenticated) {
      this.router.navigate(["login"]);
      this.toast.present("Must login to play!");
      return false;
    }

    return true;
  }
}
