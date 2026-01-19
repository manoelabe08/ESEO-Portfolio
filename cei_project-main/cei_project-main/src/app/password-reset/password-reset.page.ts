import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {

  id_user: any;
  username: any;
  new_password: any;
  new_password_verification: any;
  ancien_mot_de_passe: any;
  access_token: any;
  code_lv: any;

  type: any;
  username_block = false;
  password_block = false;

  constructor(
    public navCtrl: NavController,
    private db: DatabaseService,
    private loadingCtrl: LoadingController,
    private activetedRouter: ActivatedRoute,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  async ngOnInit() {
    const user = await this.db.getLastLogedUser();
    if(user) { this.ancien_mot_de_passe = user.password; }

    this.type = this.activetedRouter.snapshot.paramMap.get('type');
    if(this.type == 'login') {
      this.username_block = true;
      this.password_block = false;

    } else
    if(this.type == 'home') { 
      this.username_block = false;
      this.password_block = true;

      const userData = await this.db.getLastLogedUser(); 
      this.id_user = userData.id_user;
      this.code_lv = userData.code_lv;
      this.access_token = userData.access_token;

    } else {
      this.username_block = false;
      this.password_block = false;
    }
  }

  async checkUsername() {
    const userData = await this.db.restFetchUserWithUsername(this.username); 
    if(userData[0]) {
      if(userData[0].error == "Invalid User") {
        await this.toastAlert("Désolé, ce nom d'utilisateur n'est pas valide.", 'danger');

      } else {
        this.password_block = true;
        this.username_block = false;
        this.id_user = userData[0].id;
        this.code_lv = userData[0].code_lv;
        this.access_token = userData[0].access_token;
  
        await this.presentAlert('Vous pouvez maintenant modifier votre mot de passe.', 'Félicitation!');
      }
      
    } else {
      await this.toastAlert("Désolé, ce nom d'utilisateur n'est pas valide.", 'danger');
    }
  }

  async saveNewPasseword() {
    if(this.new_password !== this.new_password_verification) {
      await this.toastAlert("La vérification du mot de passe n'est pas valide.", "info");
    } else {
      const result = await this.db.changeUserPassword(this.id_user, this.new_password); 
      const data = await this.db.restPostUserPassword(this.code_lv, this.ancien_mot_de_passe, this.new_password, this.access_token);
      if(data) {
        await this.toastAlert("Mot de passe modifier avec succès.", "success");
        this.navCtrl.navigateRoot('/tabs/tabs/home');
      } 
    } 
  }

  back() {
    if(this.type == 'home') {
      this.navCtrl.navigateBack('/tabs/tabs/home');
    } else {
      this.navCtrl.navigateBack('/login');
    }
  }

  async presentAlert(message: any, title: string) {
    const alert = await this.alertCtrl.create({
      message: message,
      subHeader: title,
      buttons: ['OK']
    });
    alert.present();
  }

  async toastAlert(message: string, color: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color
    });

    await toast.present();
    return;
  }

}
