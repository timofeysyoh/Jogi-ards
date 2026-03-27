import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';

import {
  IonContent,
  IonItem,
  IonList,
  IonLabel,
  IonButton,
  IonModal,
  
} from '@ionic/angular/standalone';

@Component({
  
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ 
    IonContent,
    IonItem,
    IonList,
    IonLabel,
    IonButton,
    IonModal,
    

  ],
})
export class HomePage {
  constructor(
    private modalCtrl: ModalController,
    private router: Router
  ) {
  
  }
  goToCell() {
  this.modalCtrl.dismiss();          // закриває модальне вікно
  this.router.navigateByUrl('/cell'); // переходить на сторінку cell
}
}