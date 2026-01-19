import { Component } from '@angular/core';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isWeb = false;
  constructor(
    private db: DatabaseService
  ) {
    this.iniApp();
  }

  async iniApp() {
    this.isWeb = true;
    const res = await customElements.whenDefined('jeep-sqlite');

    await this.db.initializePlugin();
    console.log('APP READY');
  }
}
