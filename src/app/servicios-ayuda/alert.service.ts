import { Injectable, inject } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class AlertService {

  async mostrarAlerta(titulo: string, mensaje: string): Promise<void> {
    const alertController = inject(AlertController);

    const alert = await alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}
