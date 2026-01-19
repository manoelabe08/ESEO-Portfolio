import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  centre: any;
  username: any;
  count_sync: number = 0;
  syncPart: number = 0;
  syncOb: number = 0;
  syncReslt: number = 0;
  syncDocs: number = 0;

  constructor(
    public navCtrl: NavController,
    private db: DatabaseService
  ) {
    
  }

  async ngOnInit() {
    await this.loadData();
  }

  async ionViewWillEnter() {
    await this.loadData();
  }

  ionRefresh(event: any) {
    console.log('Pull Event Triggered');
    setTimeout(async () => {
      await this.loadData();
      event.target.complete();
    }, 1000);
  }

  async loadData() {
    const user = await this.db.getLastLogedUser();
    if(user) {
      this.centre = user.lieu_vote;
      this.username = user.username;
    }

    this.syncOb = 0;
    this.syncPart = 0;
    this.syncReslt = 0;
    this.syncDocs = 0;


    const participant_data = await this.db.countParticipationsNotSyncked();
    if(participant_data) { this.syncPart = participant_data.total; }

    const observation_data = await this.db.countObservationsNotSyncked(); 
    if(observation_data) { this.syncOb = observation_data.total; }

    const resultat_data = await this.db.countResultsNotSyncked(); 
    if(resultat_data) { this.syncReslt = resultat_data.total; }

    const document_data = await this.db.countDocumentsNotSyncked(); 
    if(document_data) { this.syncDocs = document_data.total; }


    this.count_sync = this.syncOb + this.syncPart + this.syncReslt + this.syncDocs;
  }

  saisie() {
    this.navCtrl.navigateForward(['/tabs/tabs/participation']);
  }

  observation() {
    this.navCtrl.navigateForward(['/tabs/tabs/observation-centre']);
  }

  resultat() {
    this.navCtrl.navigateForward(['/tabs/tabs/resultats']);
  }

  sync() {
    this.navCtrl.navigateForward(['/sync']);
  }

  logout() {
    this.navCtrl.navigateRoot(['/login']);
  }

}
