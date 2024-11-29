import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

declare var google: any;

@Component({
  selector: 'app-crearviaje',
  templateUrl: './crearviaje.page.html',
  styleUrls: ['./crearviaje.page.scss'],
})
export class CrearviajePage implements OnInit {
  origen: string = '';
  destino: string = '';
  tarifa: number | null = null;
  detalles: string = '';

  autocompleteOrigen: any;
  autocompleteDestino: any;

  @ViewChild('origenInput', { static: false }) origenInput: any;
  @ViewChild('destinoInput', { static: false }) destinoInput: any;

  constructor(
    private router: Router, 
    private storage: Storage, 
    private toastController: ToastController,
    private zone: NgZone
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.loadGoogleMaps();
  }

  loadGoogleMaps() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDQ8Igfsv_r5J8xKXacVIUc3Xwcup8U-ws&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => this.initAutocomplete();
    document.body.appendChild(script);
  }

  async initAutocomplete() {
    const origenInputElement = await this.origenInput.getInputElement();
    const destinoInputElement = await this.destinoInput.getInputElement();

    this.autocompleteOrigen = new google.maps.places.Autocomplete(origenInputElement);
    this.autocompleteDestino = new google.maps.places.Autocomplete(destinoInputElement);

    this.autocompleteOrigen.addListener('place_changed', () => {
      this.zone.run(() => {
        const place = this.autocompleteOrigen.getPlace();
        if (place.geometry) {
          this.origen = place.formatted_address;
        }
      });
    });

    this.autocompleteDestino.addListener('place_changed', () => {
      this.zone.run(() => {
        const place = this.autocompleteDestino.getPlace();
        if (place.geometry) {
          this.destino = place.formatted_address;
        }
      });
    });
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  async guardarViaje() {
    if (this.origen && this.destino && this.tarifa !== null) {
      const nuevoViaje = {
        origen: this.origen,
        destino: this.destino,
        tarifa: this.tarifa,
        detalles: this.detalles
      };

      const viajesGuardados = await this.storage.get('viajes') || [];
      viajesGuardados.push(nuevoViaje);
      await this.storage.set('viajes', viajesGuardados);

      this.origen = '';
      this.destino = '';
      this.tarifa = null;
      this.detalles = '';

      this.mostrarToast('Viaje guardado exitosamente.');
      this.router.navigate(['/perfil']);
    } else {
      this.mostrarToast('Por favor, complete todos los campos requeridos.');
    }
  }
}
