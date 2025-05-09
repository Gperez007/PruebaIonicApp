import { Component, inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  private _storage: Storage | null = null;

  private auth = inject(Storage)

  constructor() {
    this.initStorage();
  }

  async initStorage() {
    const storage = await this.auth.create();
    this._storage = storage;
  }

}
