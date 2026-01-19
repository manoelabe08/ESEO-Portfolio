import { Injectable } from '@angular/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection
} from '@capacitor-community/sqlite';
import { BehaviorSubject } from 'rxjs';
import myJson from './cei_db.json';
import { LoadingController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Filesystem, Directory } from '@capacitor/filesystem';

const DB_CEI = 'CEIResultats2025Db';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;

  private results = new BehaviorSubject<any[]>([]);
  private obervations = new BehaviorSubject<any[]>([]); 
  private participations = new BehaviorSubject<any[]>([]);  
  private bureaux_votes = new BehaviorSubject<any[]>([]);   
  private candidats = new BehaviorSubject<any[]>([]);   
  private documents = new BehaviorSubject<any[]>([]);   

  constructor(
    private loadingCtrl: LoadingController,
    private http: HttpClient
  ) { }

  async initializePlugin() {
    const loading = await this.loadingCtrl.create({
      message: 'Création de la base de donnée'
    });
    await loading.present();

    if (!Capacitor.isNativePlatform()) {
      await this.sqlite.initWebStore();
    }

    this.db = await this.sqlite.createConnection(
      DB_CEI,
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();

    const jsonString = JSON.stringify(myJson);
    await this.sqlite.isJsonValid(jsonString);
    await this.sqlite.importFromJson(jsonString);

    await this.initializePermissions();

    await loading.dismiss();

    return true;
  }

  async initializePermissions() {
    await Filesystem.checkPermissions().then(async perm => {
      console.log(perm);
    }).catch(async () => {
      await Filesystem.requestPermissions().then(async () => {
        console.log('Filesystem permission ok');
      });
    });

    await this.createResultatDir();
  }

  async createResultatDir() {
    await Filesystem.readdir({
      path: 'resultat_2025',
      directory: Directory.Documents
    }).then(async (dir) => {
      console.log(dir);
    }, async () => {
      await Filesystem.mkdir({
        path: 'resultat_2025',
        directory: Directory.Documents
      }).then(async () => {
        console.log('Folder creation ok');
      });
    });
  }

  // Users

  async saveUser(id_user: any, username: any, password: any, lieu_vote: any, code_lv: any, login_date: any, region: any, departement: any, sous_prefecture: any, commune: any, access_token: any) {
    const query = `INSERT INTO users (id_user, username, password, lieu_vote, code_lv, login_date, region, departement, sous_prefecture, commune, new_password, access_token)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const result = await this.db.query(query, [id_user, username, password, lieu_vote, code_lv, login_date, region, departement, sous_prefecture, commune, 0, access_token]);

    if (!Capacitor.isNativePlatform()) {
      this.sqlite.saveToStore(DB_CEI);
    }

    return result;
  }

  async changeUserPassword(id_user: any, new_password: any) {
    const query = `UPDATE users SET password=? WHERE id_user=?`;
    const result = await this.db.query(query, [new_password, id_user]);

    if (!Capacitor.isNativePlatform()) {
      this.sqlite.saveToStore(DB_CEI);
    }

    return result;
  }

  async loadUser(username: any, password: any) {
    const users = await this.db.query(`SELECT * FROM users WHERE username='${username}' AND password='${password}'`);
    return users.values?.[0] || null;
  }

  async restFetchUser(username: any, password: any) {
    return new Promise((resolve, reject) => {
      var link = 'https://apps.rdel.online/api/login.php';

      let myData = JSON.stringify({
        "username": username,
        "password": password
      });

      this.http.post(link, myData, {}).subscribe({
        next: (data: any) => {
          resolve([data]);
        },
        error: (error: HttpErrorResponse) => { 
          console.error('Login API error:', error);
          reject(error.status); 
        }
      });
    });
  }

  async restFetchUserWithUsername(username: any) {
    return new Promise((resolve, reject) => {
      var link = 'https://apps.rdel.online/api/login.php';

      let myData = JSON.stringify({
        "username": username
      });

      this.http.post(link, myData, {}).subscribe({
        next: (data: any) => {
          resolve([data]);
        },
        error: (error: HttpErrorResponse) => { 
          console.error('Login API error:', error);
          reject(error.status); 
        }
      });
    });
  }

  async restPostUserPassword(code_lv: any, ancien_mot_de_passe: any, nouveau_mot_de_passe: any, access_token: any) {
    return new Promise(resolve => {
      var link = 'https://apps.rdel.online/api/change-password.php';

      let myData = JSON.stringify({
        "code_lv": code_lv,
        "ancien_mot_de_passe": ancien_mot_de_passe,
        "nouveau_mot_de_passe": nouveau_mot_de_passe 
      });

      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${access_token}`);
      
      this.http.post(link, myData, { headers }).subscribe(data => {
        resolve([data]);
      });
    });
  }

  async loginUser(username: any, login_date: any) {
    const query = `UPDATE users SET login_date=? WHERE username =?`;
    const result = await this.db.query(query, [login_date, username]);

    if (!Capacitor.isNativePlatform()) {
      this.sqlite.saveToStore(DB_CEI);
    }

    return result;
  }

  async getLastLogedUser() {
    const users = await this.db.query(`SELECT * FROM users WHERE login_date IS NOT NULL LIMIT 1`);
    return users.values?.[0] || null;
  }

  async logoutAllUser() {
    const query = `UPDATE users SET login_date=''`;
    const result = await this.db.query(query, []);

    if (!Capacitor.isNativePlatform()) {
      this.sqlite.saveToStore(DB_CEI);
    }

    return result;
  }

  // Bureaux de vote

  getBureauxVotes() {
    return this.bureaux_votes.asObservable();
  }

  async loadBureauxVote() {
    const data = await this.db.query(`SELECT * FROM bureaux_vote`);
    this.bureaux_votes.next(data.values || []);
  }

  async saveBureauVote(code_bv: any, bureau_vote: any) {
    const query = `INSERT INTO bureaux_vote (code_bv, bureau_vote)
    VALUES (?, ?)`;
    const result = await this.db.query(query, [code_bv, bureau_vote]);

    if (!Capacitor.isNativePlatform()) {
      this.sqlite.saveToStore(DB_CEI);
    }

    return result;
  }

  async delateAllBureauVote() {
    const query = `DELETE FROM bureaux_vote`;
    const result = await this.db.query(query, []);

    if (!Capacitor.isNativePlatform()) {
      this.sqlite.saveToStore(DB_CEI);
    }

    return result;
  }

  // Candidats

  getCandidats() {
    return this.candidats.asObservable();
  }

  async getCandidat(id: any) {
    const data = await this.db.query(`SELECT * FROM candidats WHERE id = '${id}'`);
    return data.values?.[0] || null;
  }

  async loadCandidats() {
    const data = await this.db.query(`SELECT * FROM candidats`);
    this.candidats.next(data.values || []);
  }

  async saveCandidat(id: any, nom_parti: any, candidat: any, sigle: any, photo: any, couleur: any) {
    const query = `INSERT INTO candidats (id, nom_parti, candidat, sigle, photo, couleur)
    VALUES (?, ?, ?, ?, ?, ?)`;
    const result = await this.db.query(query, [id, nom_parti, candidat, sigle, photo, couleur]);

    if (!Capacitor.isNativePlatform()) {
      this.sqlite.saveToStore(DB_CEI);
    }

    return result;
  }

  async delateAllCandidat() {
    const query = `DELETE FROM candidats`;
    const result = await this.db.query(query, []);

    if (!Capacitor.isNativePlatform()) {
      this.sqlite.saveToStore(DB_CEI);
    }

    return result;
  }

  // results

  getResults() {
    return this.results.asObservable();
  }

  async getResult(id: any) {
    const data = await this.db.query(`SELECT * FROM resultats WHERE id = '${id}'`);
    return data.values?.[0] || null;
  }

  async countResultsNotSyncked() {
    const data = await this.db.query(`SELECT COUNT(*) AS total FROM resultats WHERE sync IS NULL`);
    return data.values?.[0] || null;
  }

  async loadResults() {
    const data = await this.db.query(`SELECT * FROM resultats`);
    this.results.next(data.values || []);
  }

  async loadResultsNotSyncked() {
    const data = await this.db.query(`SELECT * FROM resultats WHERE sync IS NULL`);
    this.results.next(data.values || []);
  }

  async saveResult(code_bv: any, total_votants: any, bulletins_nuls: any, bulletins_blancs: any, date_heure: any, scores: any) {
    const data = [code_bv, total_votants, bulletins_nuls, bulletins_blancs, date_heure, scores];
   
    const query = `INSERT INTO resultats (code_bv, total_votants, bulletins_nuls, bulletins_blancs, date_heure, scores)
    VALUES (?, ?, ?, ?, ?, ?)`;
    const result = await this.db.query(query, data);

    this.loadResults();

    if (!Capacitor.isNativePlatform()) {
      this.sqlite.saveToStore(DB_CEI);
    }

    return result;
  }

  async delateResult(id: any) {
    const query = `DELETE FROM resultats WHERE id = ?`;
    const result = await this.db.query(query, [id]);

    this.loadResults();

    if (!Capacitor.isNativePlatform()) {
      this.sqlite.saveToStore(DB_CEI);
    }

    return result;
  }

  async setSyncResult(id: any) {
    const query = `UPDATE resultats SET sync = 1 WHERE id = ?`;
    const result = await this.db.query(query, [id]);

    this.loadResults();

    if (!Capacitor.isNativePlatform()) {
      this.sqlite.saveToStore(DB_CEI);
    }

    return result;
  }

  async restPostResultats(code_bv: any, total_votants: any, bulletins_nuls: any, bulletins_blancs: any, date_heure: any, score: any, access_token: any) {
    return new Promise(resolve => {
      var link = 'https://apps.rdel.online/api/envoi_resultats_globaux.php';

      let myData = JSON.stringify({
        "code_bv": code_bv,
        "total_votants": total_votants,
        "bulletins_nuls": bulletins_nuls,
        "bulletins_blancs": bulletins_blancs, 
        "date_heure": date_heure, 
        "scores": score
      });
    
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${access_token}`);
      
      this.http.post(link, myData, { headers }).subscribe(data => {
        resolve([data]);
      });
    });
  }

  async getLastEntryResultat(date_heure: any) {
    const data = await this.db.query(`SELECT * FROM resultats WHERE date_heure = '${date_heure}'`);
    return data.values?.[0] || null;
  }

  // Observations

  getObservations() {
    return this.obervations.asObservable();
  }

  async getObservation(id: any) {
    const data = await this.db.query(`SELECT * FROM observations WHERE id = '${id}'`);
    return data.values?.[0] || null;
  }

  async countObservationsNotSyncked() {
    const data = await this.db.query(`SELECT COUNT(*) AS total FROM observations WHERE sync IS NULL`);
    return data.values?.[0] || null;
  }

  async loadObservations() {
    const data = await this.db.query(`SELECT * FROM observations`);
    this.obervations.next(data.values || []);
  }

  async loadNotSyncObservations() {
    const data = await this.db.query(`SELECT * FROM observations WHERE sync IS NULL`);
    this.obervations.next(data.values || []);
  }

  async saveObservation(message: any, code_lv: any, sent_dt: any, type: any) {
    const data = [message, code_lv, sent_dt, type]; 
    const query = `INSERT INTO observations (message, code_lv, sent_dt, type)
    VALUES (?, ?, ?, ?)`;
    const result = await this.db.query(query, data);

    this.loadObservations();

    if (!Capacitor.isNativePlatform()) {
      this.sqlite.saveToStore(DB_CEI);
    }

    return result;
  }

  async setSyncObservation(id: any) {
    const query = `UPDATE observations SET sync = 1 WHERE id = ?`;
    const result = await this.db.query(query, [id]);

    this.loadObservations();

    if (!Capacitor.isNativePlatform()) {
      this.sqlite.saveToStore(DB_CEI);
    }

    return result;
  }

  async delateObservation(id: any) {
    const query = `DELETE FROM observations WHERE id = ?`;
    const result = await this.db.query(query, [id]);

    this.loadObservations();

    if (!Capacitor.isNativePlatform()) {
      this.sqlite.saveToStore(DB_CEI);
    }

    return result;
  }

  async restPostObservation(code_lv: any, sent_dt: any, message: any, type: any, access_token: any) {
    return new Promise(resolve => {
      var link = 'https://apps.rdel.online/api/envoi_notification.php';

      let myData = JSON.stringify({
        "code_lv": code_lv,
        "sent_dt": sent_dt,
        "message": message,
        "type": type 
      });

      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${access_token}`);
    
      this.http.post(link, myData, { headers }).subscribe(data => { 
        resolve([data]);
      });
    });
  }

  async getLastEntryObservation(date_heure: any) {
    const data = await this.db.query(`SELECT * FROM observations WHERE sent_dt = '${date_heure}'`);
    return data.values?.[0] || null;
  }

  // Participation

  getParticipations() {
    return this.participations.asObservable();
  }

  async countParticipation() {
    const data = await this.db.query(`SELECT COUNT(*) AS total FROM participation`);
    return data.values?.[0] || null;
  }

  async countParticipationsNotSyncked() {
    const data = await this.db.query(`SELECT COUNT(*) AS total FROM participation WHERE sync IS NULL`);
    return data.values?.[0] || null;
  }

  async loadParticipations() {
    const data = await this.db.query(`SELECT * FROM participation`);
    this.participations.next(data.values || []);
  }

  async loadParticipationsNotSyncked() {
    const data = await this.db.query(`SELECT * FROM participation WHERE sync IS NULL`);
    this.participations.next(data.values || []);
  }

  async saveParticipation(code_bv: any, nombre_votant_homme: any, nombre_votant_femme: any, date_heure: any) {
    const data = [code_bv, nombre_votant_homme, nombre_votant_femme, date_heure];
    const query = `INSERT INTO participation (code_bv, nombre_votant_homme, nombre_votant_femme, date_heure)
    VALUES (?, ?, ?, ?)`;
    const result = await this.db.query(query, data);

    this.loadParticipations();

    if (!Capacitor.isNativePlatform()) {
      this.sqlite.saveToStore(DB_CEI);
    }

    return result;
  }

  async delateParticipation(id: any) {
    const query = `DELETE FROM participation WHERE id = ?`;
    const result = await this.db.query(query, [id]);

    this.loadParticipations();

    if (!Capacitor.isNativePlatform()) {
      this.sqlite.saveToStore(DB_CEI);
    }

    return result;
  }

  async setSyncParticipation(id: any) {
    const query = `UPDATE participation SET sync = 1 WHERE id = ?`;
    const result = await this.db.query(query, [id]);

    this.loadParticipations();

    if (!Capacitor.isNativePlatform()) {
      this.sqlite.saveToStore(DB_CEI);
    }

    return result;
  }

  async restPostParticipation(code_bv: any, nombre_votant_homme: any, nombre_votant_femme: any, date_heure: any, access_token: any) {
    return new Promise(resolve => {
      var link = 'https://apps.rdel.online/api/envoi_participation.php';

      let myData = JSON.stringify({
        "code_bv": code_bv,
        "nombre_votant_homme": nombre_votant_homme,
        "nombre_votant_femme": nombre_votant_femme,
        "date_heure_envoi": date_heure 
      });

      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${access_token}`);
      
      this.http.post(link, myData, { headers }).subscribe(data => {
        resolve([data]);
      });
    });
  }

  async getLastEntryParticipan(date_heure: any) {
    const data = await this.db.query(`SELECT * FROM participation WHERE date_heure = '${date_heure}'`);
    return data.values?.[0] || null;
  }

  // Document

  getDocuments() {
    return this.documents.asObservable();
  }

  async countDocument() {
    const data = await this.db.query(`SELECT COUNT(*) AS total FROM document`);
    return data.values?.[0] || null;
  }

  async countDocumentsNotSyncked() {
    const data = await this.db.query(`SELECT COUNT(*) AS total FROM document WHERE sync IS NULL`);
    return data.values?.[0] || null;
  }

  async loadDocuments() {
    const data = await this.db.query(`SELECT * FROM document`);
    this.documents.next(data.values || []);
  }

  async loadDocumentsNotSyncked() {
    const data = await this.db.query(`SELECT * FROM document WHERE sync IS NULL`);
    this.documents.next(data.values || []);
  }

  async saveDocument(nom_doc: any, code_lv: any, code_bv: any, date_heure: any) {
    const data = [nom_doc, code_lv, code_bv, date_heure];
    const query = `INSERT INTO document (nom_doc, code_lv, code_bv, date_heure)
    VALUES (?, ?, ?, ?)`;
    const result = await this.db.query(query, data);

    this.loadDocuments();

    if (!Capacitor.isNativePlatform()) {
      this.sqlite.saveToStore(DB_CEI);
    }

    return result;
  }

  async delateDocument(id: any) {
    const query = `DELETE FROM document WHERE id = ?`;
    const result = await this.db.query(query, [id]);

    this.loadDocuments();

    if (!Capacitor.isNativePlatform()) {
      this.sqlite.saveToStore(DB_CEI);
    }

    return result;
  }

  async setSyncDocument(id: any) {
    const query = `UPDATE document SET sync = 1 WHERE id = ?`;
    const result = await this.db.query(query, [id]);

    this.loadDocuments();

    if (!Capacitor.isNativePlatform()) {
      this.sqlite.saveToStore(DB_CEI);
    }

    return result;
  }

  async getLastEntryDocument(date_heure: any) {
    const data = await this.db.query(`SELECT * FROM document WHERE date_heure = '${date_heure}'`);
    return data.values?.[0] || null;
  }
}
