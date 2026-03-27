import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CameraPreview, CameraPreviewOptions } from '@capacitor-community/camera-preview';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Camera } from '@capacitor/camera';

import {
  IonContent,
  IonButton,
  
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.page.html',
  styleUrls: ['./cell.page.scss'],
  standalone: true,
  
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    IonButton,
    
  
  ]

})

export class CellPage implements OnInit, OnDestroy {

  constructor(
    private router: Router
  ) {}

  async ngOnInit() {

    
    const options: CameraPreviewOptions = {
      position: 'rear',
      parent: 'cameraPreview',
      toBack: true, // Камера ПІД вебом
      width: window.screen.width,
      height: window.screen.height,
    };

    try {
      await CameraPreview.start(options);
      // Робимо інтерфейс прозорим
      document.body.classList.add('camera-active');
    } catch (e) {
      console.error('Camera start error:', e);
    }
  }

  async ngOnDestroy() {
    // Обов'язково вимикаємо камеру та повертаємо фон
    await CameraPreview.stop();
    document.body.classList.remove('camera-active');
  }


  

/**
   * Функція фотографування
   * Викликається при натисканні кнопки camera-btn
   */
  async goToaddcard(){

    try {

      // Робимо фото
      const result = await CameraPreview.capture({
        quality: 90 // якість фото
      });

      /**
       * CameraPreview повертає base64
       * Ми додаємо префікс щоб браузер зрозумів що це зображення
       */
      const image = 'data:image/jpeg;base64,' + result.value;


       /**
     * ВАЖЛИВО
     * Зупиняємо камеру перед переходом на іншу сторінку
     * Інакше вона залишиться активною під UI
     */
    await CameraPreview.stop();
    /**
     * Прибираємо прозорий фон
     */
    document.body.classList.remove('camera-active');
      /**
       * Переходимо на сторінку addcard
       * і передаємо фото через Router state
       */
      this.router.navigate(['/addcard'], {
        state: { photo: image }
      });

    } catch (error) {

      console.error('Photo capture error:', error);

    }

  }
}