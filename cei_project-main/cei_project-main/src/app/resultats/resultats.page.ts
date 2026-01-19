import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, NavController, Platform } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-resultats',
  templateUrl: './resultats.page.html',
  styleUrls: ['./resultats.page.scss'],
})
export class ResultatsPage implements OnInit {

  date_jour: any = null;
  isBtnDisabled: boolean = true;

  lieu_vote: any;
  code_lv: any;

  nb_bulletins_nuls: any = 0;
  nb_bulletins_blancs: any = 0;
  total_votants: any = 0;

  id_candidat: any = null;
  score_candidat: any = 0;
  score: any[] = [];
  code_bv: any;
  token: any;
  photo_resultat = null;

  bureaux_vote_list: any[] = [];
  candidats_list: any[] = [];
  resultats_candidat: any[] = [];

  constructor(
    private plt: Platform,
    private loadingCtr: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private db: DatabaseService
  ) { }

  async ngOnInit() {
    let d = new Date();
    this.date_jour = d.getUTCFullYear() + "-" + ("0" + (d.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + d.getUTCDate()).slice(-2) + " " + ("0" + d.getUTCHours()).slice(-2) + ":" + ("0" + d.getUTCMinutes()).slice(-2) + ":" + ("0" + d.getUTCSeconds()).slice(-2);
  }

  async ionViewWillEnter() {
    this.score = [];
    this.resultats_candidat = [];

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

    await this.db.loadCandidats();
    this.db.getCandidats().subscribe(data => {
      this.candidats_list = data.sort((a: any, b: any) => {
        if (a.bureau_vote > b.bureau_vote) { return 1 }
        if (a.bureau_vote < b.bureau_vote) { return -1 }
        return 0;
      });
    });
  }

  async addCandidatResultat() {
    if(this.id_candidat!=null) {
      this.score.push(
        {
          "candidat_id": this.id_candidat,
          "score": this.score_candidat
        }
      ); 
  
      const candt = await this.db.getCandidat(this.id_candidat);  
  
      let cdt_photo = '../assets/Sample_User_Icon.png';
      if(candt.photo != null){ cdt_photo = candt.photo; }
  
      this.resultats_candidat.push({
        "candidat_id": this.id_candidat,
        "photo":cdt_photo,
        "nom_parti":candt.nom_parti,
        "candidat":candt.candidat,
        "score":this.score_candidat
      }); 

      this.score_candidat = 0;
      this.id_candidat = null;

      if(this.candidats_list.length === this.resultats_candidat.length) {
        this.isBtnDisabled = false;
      } else {
        this.isBtnDisabled = true;
      }
    }
  }

  deleteResultat(id: number) {
    const index = this.resultats_candidat.findIndex(candidat => candidat.candidat_id === id);
    const index2 = this.score.findIndex(candidat => candidat.candidat_id === id);

    if (index > -1) {
      this.resultats_candidat.splice(index, 1);
    }

    if (index2 > -1) {
      this.score.splice(index2, 1);
    }
    
    if(this.candidats_list.length === this.resultats_candidat.length) {
      this.isBtnDisabled = false;
    } else {
      this.isBtnDisabled = true;
    }
  }

  async saveSaisie() {
    if (this.date_jour == null) {
      this.toastAlert('Entrez la date du jour.', 'danger');
    } else {
      const loading = await this.loadingCtr.create({
        message: 'Enregistrement...'
      });
      await loading.present();

      await this.db.saveResult(this.code_bv, this.total_votants, this.nb_bulletins_nuls, this.nb_bulletins_blancs, this.date_jour, this.score);
      await this.toastAlert('Résultats enregistrées', 'success');
      loading.dismiss();

      const result = await this.db.getLastEntryResultat(this.date_jour);
      if(result) {
        const status = await Network.getStatus();
        if (status.connected == true) {
          await this.db.restPostResultats(this.code_bv, this.total_votants, this.nb_bulletins_nuls, this.nb_bulletins_blancs, this.date_jour, this.score, this.token)
            .then(async () => {
              await this.db.setSyncResult(result.id);
              await this.toastAlert('Résultats synchroniées', 'success');
            });
        }
      }
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
            this.photo_resultat = image.webPath;
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
}
