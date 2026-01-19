import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController, Platform, ToastController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-observation-centre',
  templateUrl: './observation-centre.page.html',
  styleUrls: ['./observation-centre.page.scss'],
})
export class ObservationCentrePage implements OnInit {

  date_jour: any = null;
  message: any = "";
  code_lv: any = null;
  lieu_vote: any = null;
  code_bv: any = null;
  sent_dt: any = null;
  state: any = 0;
  type: any = 'Information générale';
  token: any;

  photo_observation: any;
  bureaux_vote_list: any[] = [];

  constructor(
    private plt: Platform,
    private modal: ModalController,
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
    this.code_lv = user.code_lv;
    this.lieu_vote = user.lieu_vote;

    await this.db.loadBureauxVote();
    this.db.getBureauxVotes().subscribe(data => {
      this.bureaux_vote_list = data.sort((a: any, b: any) => {
        if (a.bureau_vote > b.bureau_vote) { return 1 }
        if (a.bureau_vote < b.bureau_vote) { return -1 }
        return 0;
      });
    });
  }

  async saveObservation() {
    if (this.date_jour == null) {
      await this.toastAlert('Entrez la date du jour.', 'warning');
    } else
      if (this.message == "") {
        await this.toastAlert('Entrez votre observation.', 'warning');
      } else {
        const loading = await this.loadingCtr.create({
          message: 'Enregistrement...'
        });
        loading.present();

        this.sent_dt = this.date_jour;

        await this.db.saveObservation(this.message, this.code_lv, this.sent_dt, this.type);
        await this.toastAlert('Enregistrer avec succès.', 'success');

        const observation = await this.db.getLastEntryObservation(this.sent_dt);
        if (observation) {
          loading.dismiss();

          const status = await Network.getStatus();
          if (status.connected == true) {
            await this.db.restPostObservation(this.code_lv, this.sent_dt, this.message, this.type, this.token)
              .then(async () => {
                await this.db.setSyncObservation(observation.id);
                await this.toastAlert('Observation synchroniée', 'success');
              });
          }

          let d = new Date();
          this.date_jour = d.getUTCFullYear() + "-" + ("0" + (d.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + d.getUTCDate()).slice(-2) + " " + ("0" + d.getUTCHours()).slice(-2) + ":" + ("0" + d.getUTCMinutes()).slice(-2) + ":" + ("0" + d.getUTCSeconds()).slice(-2);
          this.code_bv = null;
          this.type = 'Information générale';
          this.message = "";
        }

        // this.navCtrl.navigateRoot('/tabs/tabs/home');
      }
  }

  async photo() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });

    if (image) {
      const base64Data = await this.readAsBase64(image);

      var m = new Date();
      let date = m.getUTCFullYear() + "-" + ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + m.getUTCDate()).slice(-2) + "_" + ("0" + m.getUTCHours()).slice(-2) + "-" + ("0" + m.getUTCMinutes()).slice(-2) + "-" + ("0" + m.getUTCSeconds()).slice(-2);

      const newFileName = date + ".jpg";

      const savedFile = await Filesystem.writeFile({
        path: 'resultat_2025/' + newFileName,
        data: base64Data,
        directory: Directory.Documents
      });

      if (savedFile) {
        await this.db.saveDocument(newFileName, this.code_lv, this.code_bv, date)
          .then(() => {
            this.toastAlert('Enregistrer avec succès.', 'success');
            this.photo_observation = image.webPath;
          });
      }
    }
  }

  private async readAsBase64(photo: Photo) {

    const img_path: any = photo.path;
    const img_url: any = photo.webPath;

    if (this.plt.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: img_path
      });

      return file.data;
    }
    else {
      const response = await fetch(img_url);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });


  async toastAlert(message: any, color: any) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 800,
      position: 'bottom',
      color: color
    });
    toast.then(toast => toast.present());
  }

  async saveDate() {
    await this.modal.dismiss();
  }

}
