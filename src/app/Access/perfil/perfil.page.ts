import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  username = '';
  constructor(private router: Router,
              private animationController: AnimationController) {
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      username: '';
      password: '';
    };
    this.username = state.username;
    //Console.log
    //Mensaje bienvenida
  }


  ngOnInit() {
    this.animarLogo();
    this.animarAuto();
  }

  animarLogo() {
    const logo = document.querySelector('.login img') as HTMLElement;
  
    const animacion = this.animationController.create()
      .addElement(logo)
      .duration(4000)  // Un poco más lenta para ser sutil
      .iterations(Infinity)  // Repetición infinita
      .keyframes([
        { offset: 0, transform: 'rotate(0deg)' },
        { offset: 0.25, transform: 'rotate(-5deg)' },  // Balanceo a la izquierda
        { offset: 0.5, transform: 'rotate(0deg)' },  // Vuelve al centro
        { offset: 0.75, transform: 'rotate(5deg)' },  // Balanceo a la derecha
        { offset: 1, transform: 'rotate(0deg)' }  // Vuelve al centro
      ]);
  
    animacion.play();
  }
  animarAuto() {
    const auto = document.querySelector('.auto') as HTMLElement;
    
    const animacion = this.animationController.create()
      .addElement(auto)
      .duration(5000)  // Tiempo total de la animación (5 segundos)
      .iterations(Infinity)  // Repetición infinita
      .keyframes([
        { offset: 0, transform: 'translateX(-200%)' },  // Comienza fuera de la pantalla a la izquierda
        { offset: 1, transform: 'translateX(100%)' }  // Termina fuera de la pantalla a la derecha
      ]);
    
    animacion.play();
  }

}

