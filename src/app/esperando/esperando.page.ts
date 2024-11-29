import { Component, AfterViewInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-esperando',
  templateUrl: './esperando.page.html',
  styleUrls: ['./esperando.page.scss'],
})
export class EsperandoPage implements AfterViewInit {
  map: any;
  currentLocationMarker: any;
  viajeData: any;

  constructor(
    private geolocation: Geolocation,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.viajeData = navigation.extras.state['viaje'];  
    }
  }

  ngAfterViewInit() {
    this.loadGoogleMaps();
  }

  loadGoogleMaps() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDQ8Igfsv_r5J8xKXacVIUc3Xwcup8U-ws&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => this.initMap();
    document.body.appendChild(script);
  }

  async initMap() {
    const lastViaje = this.viajeData;

    this.geolocation.getCurrentPosition().then((resp) => {
      const latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

      const mapStyles = [
        {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
            { "color": "#e0e0e0" } 
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            { "color": "#a0a0a0" } 
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [
            { "visibility": "on" }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
            { "visibility": "off" }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            { "color": "#f2f2f2" } 
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            { "visibility": "off" }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
            { "color": "#cccccc" } 
          ]
        }
      ];

      const mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: mapStyles,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: false
      };

      const mapElement = document.getElementById('map');
      if (mapElement) {
        this.map = new google.maps.Map(mapElement, mapOptions);
        this.currentLocationMarker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          title: 'Ubicación Actual',
          icon: {
            url: 'assets/img/persona.webp', 
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(20, 40) 
          }
        });

        this.calculateAndDisplayRoute(lastViaje);
      }

    }).catch((error) => {
      console.log('Error obteniendo la ubicación', error);
    });
  }

  calculateAndDisplayRoute(viaje: any) {
    if (!viaje || !viaje.origen || !viaje.destino) {
      console.error('Datos del viaje incompletos:', viaje);
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(this.map);

    const request = {
      origin: viaje.origen,
      destination: viaje.destino,
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, (result: any, status: any) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);
      } else {
        console.log('Error mostrando la ruta', status);
      }
    });
  }

  cancelarViaje() {
    console.log('Viaje cancelado');
    this.router.navigate(['/viajes']);
  }
}
