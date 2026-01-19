import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-participation',
  templateUrl: './participation.page.html',
  styleUrls: ['./participation.page.scss'],
})
export class ParticipationPage implements OnInit {

  date_jour: any = null;
  bureaux_vote_list: any[] = [];

  lieu_vote: any;
  code_lv: any;

  nb_votant_homme: any = 0;
  nb_votant_femme: any = 0;
  code_bv: any;
  token: any;

  constructor(
    private loadingCtr: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private db: DatabaseService
  ) { }

  ngOnInit() {
    let d = new Date();
    this.date_jour = d.getUTCFullYear() + "-" + ("0" + (d.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + d.getUTCDate()).slice(-2) + " " + ("0" + d.getUTCHours()).slice(-2) + ":" + ("0" + d.getUTCMinutes()).slice(-2) + ":" + ("0" + d.getUTCSeconds()).slice(-2);
  }

  async ionViewWillEnter() {
    const user = await this.db.getLastLogedUser();
    this.token = user.access_token;

    await this.db.loadBureauxVote();
    this.db.getBureauxVotes().subscribe(data => {
      this.bureaux_vote_list = data.sort((a: any, b: any) => {
        if (a.bureau_vote > b.bureau_vote) { return 1 }
        if (a.bureau_vote < b.bureau_vote) { return -1 }
        return 0;
      });
    });
  }

  async saveVotant() {
    await this.db.saveParticipation(this.code_bv, this.nb_votant_homme, this.nb_votant_femme, this.date_jour);
    await this.toastAlert('Participation enregistrée', 'success');

    const participant = await this.db.getLastEntryParticipan(this.date_jour);
    if (participant) {

      const status = await Network.getStatus();
      if (status.connected == true) {
        await this.db.restPostParticipation(this.code_bv, this.nb_votant_homme, this.nb_votant_femme, this.date_jour, this.token)
          .then(async () => {
            await this.db.setSyncParticipation(participant.id);
            await this.toastAlert('Participation synchroniée', 'success');
          });
      }

      let d = new Date();
      this.date_jour = d.getUTCFullYear() + "-" + ("0" + (d.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + d.getUTCDate()).slice(-2) + " " + ("0" + d.getUTCHours()).slice(-2) + ":" + ("0" + d.getUTCMinutes()).slice(-2) + ":" + ("0" + d.getUTCSeconds()).slice(-2);

      this.nb_votant_homme = 0;
      this.nb_votant_femme = 0;
    }
  }

  async toastAlert(message: any, color: any) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 800,
      position: 'bottom',
      color: color
    });
    toast.then(toast => toast.present());
  }
}
