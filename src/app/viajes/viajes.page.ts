import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {

  viajes: any[] = []; 

  constructor(
    private storage: Storage,
    private alertController: AlertController,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.cargarViajes();
  }

  async cargarViajes() {
    this.viajes = await this.storage.get('viajes') || [];
  }

  async contratar(viaje: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar Contratación',
      message: `¿Seguro que quieres contratar este viaje por ${viaje.tarifa} $ ?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: () => {
            this.confirmarContratacion(viaje);
          },
        },
      ],
    });

    await alert.present();
  }

  confirmarContratacion(viaje: any) {
    this.router.navigate(['/esperando'], { state: { viaje } });
  }
}
