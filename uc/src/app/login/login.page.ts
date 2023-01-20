import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { FormValidations } from '../form-validations';
import { AuthService } from '../services/auth.service';
import { isPlatform  } from '@ionic/angular';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: any = null;
  credentials!: FormGroup;
  type: boolean = true;

  constructor(private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router) {
      if(!isPlatform('capacitor')) {
        GoogleAuth.initialize();
      }
     }

    get email() {
      return this.credentials.get('email');
    }
    get senha() {
      return this.credentials.get('senha');
    }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required,
        Validators.pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i),
        Validators.email,]],
      confEmail: ['', [Validators.required,
        FormValidations.equalsTo('email'),]],
      senha: ['', [Validators.required,
        Validators.pattern(/^(?=.*[@*\.])[a-zA-Z0-9@*]{6,10}$/),]],
      confPass: ['', [Validators.required,
        FormValidations.equalsTo('senha'),]]
    });
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();

    if(user) {
     this.router.navigateByUrl('/tabs/register', {replaceUrl: true});
    }else {
     this.showAlert('Registration failed', 'please try again!');
    }
   }

   async login() {
    const loading = await this.loadingController.create();
   await loading.present();

   const user = await this.authService.login(this.credentials.value);
   await loading.dismiss();

   if(user) {
    this.router.navigateByUrl('/tabs/register', {replaceUrl: true});
   }else {
    this.showAlert('Login failed', 'please try again!');
   }
  }

  async showAlert(header: any, message: any) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }


  changeType() {
    this.type = !this.type;
  }
  goToHome() {}

  facebookLogin() {}

  instagramLogin() {}

  twitterLogin() {}

  touchLogin() {}

  faceLogin() {}

  goToRegister() {}

  openSignUp() {}

  async signIn() {
    this.user = await GoogleAuth.signIn();
    console.log('user: ', this.user);
  }

  async refresh() {
    const authCode = await GoogleAuth.refresh();
    console.log('refresh: ', authCode);
  }

  async signOut() {
    await GoogleAuth.signOut();
    this.user = null;
  }
}


