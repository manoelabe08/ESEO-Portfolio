import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public lang: any;
  public username: any;
  public password: any;
  public save_login: any;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(
    public navCtrl: NavController,
    private db: DatabaseService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  reset_pass() {
    this.navCtrl.navigateRoot(['/password-reset/login']);
  }

  async login() {
    if (this.username == null) {
      this.presentAlert("Entrer le nom d'utilisateur", 'Erreur');

    } else
      if (this.password == null) {
        this.presentAlert("Entrer le mot de passe", 'Erreur');

      } else
        if ((this.username != null) && (this.password != null)) {

          var m = new Date();
          let date = m.getUTCFullYear() + "-" + ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + m.getUTCDate()).slice(-2) + " " + ("0" + m.getUTCHours()).slice(-2) + ":" + ("0" + m.getUTCMinutes()).slice(-2) + ":" + ("0" + m.getUTCSeconds()).slice(-2);

          const data = await this.db.loadUser(this.username, this.password); 
          if (data == null) {
            this.db.restFetchUser(this.username, this.password).then(value => {
              if (value) {
                this.db.saveUser(value[0].id, this.username, this.password, value[0].lieu_vote, value[0].code_lv, date, value[0].region, value[0].departement, value[0].sous_prefecture, value[0].commune, value[0].access_token)
                  .then(async () => {
                    await this.db.logoutAllUser();
                    await this.db.loginUser(this.username, date);

                    await this.saveBureauxVote(value[0].bureaux_vote); 
                    await this.saveCandidat(value[0].candidats); 

                    await this.navCtrl.navigateRoot(['/password-reset/home']);
                  });
              } 

            }).catch(async () => {
              await this.toastAlert('Identifiant invalid', 'danger');
            });

          } else {
            if (data.lenght == 0) {
              this.presentAlert("Le nom d'utilisateur ou le mot de passe n'est pas valide.", 'Erreur');

            } else {
              await this.db.logoutAllUser();
              await this.db.loginUser(this.username, date);
              this.navCtrl.navigateRoot('/tabs/tabs/home');
            }
          }
        }
  }

  async saveBureauxVote(value: any) {
    value.forEach(async (bv: any) => {
      await this.db.saveBureauVote(bv.code_bv, bv.bureau_vote);
    });
  }

  async saveCandidat(value: any) {
    value.forEach(async (cdt: any) => {
      await this.db.saveCandidat(cdt.id, cdt.nom_parti, cdt.candidat, cdt.sigle, cdt.photo, cdt.couleur);
    });
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
