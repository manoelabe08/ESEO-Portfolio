import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.page.html',
  styleUrls: ['./sync.page.scss'],
})
export class SyncPage implements OnInit {

  tt_results: any = 0;
  tt_observations: any = 0;
  tt_participation: any = 0;
  tt_documents: any = 0;

  data_results: any[] = [];
  data_observations: any[] = [];
  data_participations: any[] = [];
  data_documents: any[] = [];

  access_token: any;

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private db: DatabaseService
  ) { }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    const result_data = await this.db.countResultsNotSyncked();
    if (result_data) { this.tt_results = result_data.total; }

    const observation_data = await this.db.countObservationsNotSyncked();
    if (observation_data) { this.tt_observations = observation_data.total; }

    const participation_data = await this.db.countParticipationsNotSyncked();
    if (participation_data) { this.tt_participation = participation_data.total; }

    const document_data = await this.db.countDocumentsNotSyncked();
    if (document_data) { this.tt_documents = document_data.total; }

    this.data_results = [];
    await this.db.loadResultsNotSyncked();
    this.db.getResults().subscribe(data => {
      this.data_results = data;
    });

    this.data_observations = [];
    await this.db.loadNotSyncObservations();
    this.db.getObservations().subscribe(data => {
      this.data_observations = data;
    });

    this.data_participations = [];
    await this.db.loadParticipationsNotSyncked();
    this.db.getParticipations().subscribe(data => {
      this.data_participations = data;
    });

    this.data_documents = [];
    await this.db.loadDocumentsNotSyncked();
    this.db.getDocuments().subscribe(data => {
      this.data_documents = data;
    });

    const user = await this.db.getLastLogedUser();
    this.access_token = user.access_token;
  }

  async syncSaisies() {
    const loading = await this.loadingCtrl.create({
      message: 'Envoi des données..'
    });
    await loading.present();

    const tt = this.data_results.length;

    var link = 'https://apps.rdel.online/api/envoi_resultats_globaux.php';

    let x = 0;
    this.data_results.forEach(async value => {
      let myData = JSON.stringify({
        "code_bv": value.code_bv,
        "total_votants": value.total_votants,
        "bulletins_nuls": value.bulletins_nuls,
        "bulletins_blancs": value.bulletins_blancs,
        "date_heure": value.date_heure,
        "score": value.score
      });

      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.access_token}`);

      this.http.post(link, myData, { headers }).subscribe(async data => {
        await this.db.setSyncResult(value.id);

        this.toastAlert('Donnée Chargé.', 'success');
        this.loadData();

        x = x + 1;

        if (x == tt) {
          loading.dismiss();
        }
      });
    });
  }


  async syncObservations() {
    console.log(this.data_observations);
    const loading = await this.loadingCtrl.create({
      message: 'Envoi des données..'
    });
    await loading.present();

    const tt = this.data_observations.length;

    var link = 'https://apps.rdel.online/api/envoi_notification.php';

    let x = 0;
    this.data_observations.forEach(async value => {
      let myData = JSON.stringify({
        "code_lv": value.code_lv,
        "sent_dt": value.sent_dt,
        "message": value.message,
        "type": value.type
      });

      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.access_token}`);

      this.http.post(link, myData, { headers }).subscribe(async data => {
        console.log(data);
        await this.db.setSyncObservation(value.id);

        this.toastAlert('Donnée Chargé.', 'success');
        // loading.dismiss();
        x = x + 1;

        if (x == tt) {
          loading.dismiss();
        }
      });
    });
  }

  async syncParticipations() {
    const loading = await this.loadingCtrl.create({
      message: 'Envoi des données..'
    });
    await loading.present();

    const tt = this.data_participations.length;

    var link = 'https://apps.rdel.online/api/envoi_participation.php';

    let x = 0;
    this.data_participations.forEach(async value => {
      let myData = JSON.stringify({
        "code_bv": value.code_bv,
        "nombre_votant_homme": value.nombre_votant_homme,
        "nombre_votant_femme": value.nombre_votant_femme,
        "date_heure_envoi": value.date_heure
      });

      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.access_token}`);

      this.http.post(link, myData, { headers }).subscribe(async data => {
        console.log(data);
        await this.db.setSyncObservation(value.id);

        this.toastAlert('Donnée Chargé.', 'success');
        // loading.dismiss();
        x = x + 1;

        if (x == tt) {
          loading.dismiss();
        }
      });
    });
  }

  async syncDocument() {
    const loading = await this.loadingCtrl.create({
      message: 'Envoi des données..'
    });
    await loading.present();

    const tt = this.data_documents.length;

    var link = 'https://apps.rdel.online/api/upload.php';

    let x = 0;
    this.data_documents.forEach(async value => {
      const document = await Filesystem.readFile({
        path: 'resultat_2025/' + value.nom_doc,
        directory: Directory.Documents
      });
      const img = 'data:image/jpeg;base64,' + document.data;
  
      const response = await fetch(img);
      const blob = await response.blob();
  
      const formData = new FormData();
      formData.append('image', blob, value.nom_doc);
      formData.append('code_lv', value.code_lv);
      formData.append('code_bv', value.code_bv);
      formData.append('date_heure', value.date_heure);
  
      this.httpService.postWithProgress(link, formData).subscribe({
        next: async (event) => {
          if (event.response) {
            console.log(event.response);
  
            if (event.response == 1) {
              await this.db.setSyncDocument(value.id);
  
              x = x + 1;

              if (x == tt) {
                loading.dismiss();
              }
            }
          }
        },
        error: async (err) => {
          console.error('Upload failed:', err);
        },
      });
    });
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
