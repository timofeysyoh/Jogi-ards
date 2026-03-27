import { Component, OnInit } from '@angular/core';
import { IonContent} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.page.html',
  styleUrls: ['./addcard.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    RouterLink,
    CommonModule,

    
  ]
})
export class AddcardPage implements OnInit {

  /**
   * Змінна для збереження фото
   * Вона буде використана у HTML
   */
  photo: string | null = null;
   /**
   * Обрізане фото яке будемо показувати
   */
  croppedPhoto: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {

    /**
     * Отримуємо дані які передали через Router state
     */
    const state = history.state;

    /**
     * Якщо фото було передане — зберігаємо його
     */
    if (state?.photo) {
      this.photo = state.photo;
      console.log('Фото отримано:', this.photo);


       /**
       * Запускаємо функцію обрізання
       */
      this.cropImage();
    }

  }

  cropImage() {

  if (!this.photo) return;

  const img = new Image();

  img.onload = () => {

    /**
     * Розмір екрана телефону
     */
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    /**
     * Розмір фото
     */
    const imgWidth = img.width;
    const imgHeight = img.height;

    /**
     * Рахуємо масштаб
     */
    const scaleX = imgWidth / screenWidth;
    const scaleY = imgHeight / screenHeight;

    /**
     * Параметри рамки (такі ж як у CSS)
     */
    const rectWidth = 320;
    const rectHeight = 190;

    const rectTop = 70;
    const rectLeft = (screenWidth / 2) - (rectWidth / 2);

    /**
     * Переводимо координати рамки у координати фото
     */
    const cropX = rectLeft * scaleX;
    const cropY = rectTop * scaleY;

    const cropWidth = rectWidth * scaleX;
    const cropHeight = rectHeight * scaleY;

    /**
     * Створюємо canvas
     */
    const canvas = document.createElement('canvas');

    canvas.width = rectWidth;
    canvas.height = rectHeight;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    /**
     * Обрізаємо саме область рамки
     */
    ctx.drawImage(
      img,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      rectWidth,
      rectHeight
    );

    /**
     * Перетворюємо назад у base64
     */
    this.croppedPhoto = canvas.toDataURL('image/jpeg', 0.9);

  };

  img.src = this.photo;

}

}
    