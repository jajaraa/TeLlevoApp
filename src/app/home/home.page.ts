import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user = {
    username: '',
    password: '',
  };

  mensaje = '';

  spinner = false;

  ngOnInit() {
    this.animarLogo();
    this.animarAuto();
  }
  constructor(private router: Router, private animationController: AnimationController) {


  }
  animarLogo() {
    const logo = document.querySelector('.login img') as HTMLElement;
  
    const animacion = this.animationController.create()
      .addElement(logo)
      .duration(4000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'rotate(0deg)' },
        { offset: 0.25, transform: 'rotate(-5deg)' },
        { offset: 0.5, transform: 'rotate(0deg)' },
        { offset: 0.75, transform: 'rotate(5deg)' }, 
        { offset: 1, transform: 'rotate(0deg)' } 
      ]);
  
    animacion.play();
  }

  animarAuto() {
    const auto = document.querySelector('.auto') as HTMLElement;
    
    const animacion = this.animationController.create()
      .addElement(auto)
      .duration(5000)  
      .iterations(Infinity) 
      .keyframes([
        { offset: 0, transform: 'translateX(-200%)' }, 
        { offset: 1, transform: 'translateX(100%)' }  
      ]);
    
    animacion.play();
  }
 

  cambiarSpinner() {
    this.spinner = !this.spinner;
  }
  validar() {
    if (this.user.username.length != 0) {
      if (this.user.password.length != 0) {

        this.mensaje = 'Conexion exitosa';
        let navigationExtras: NavigationExtras = {
          state: {
            username: this.user.username,
            password: this.user.password,
          },
        };
        this.cambiarSpinner();

        setTimeout(() => {

          this.router.navigate(['/perfil'], navigationExtras);
          this.cambiarSpinner();
          this.mensaje = "";
        }, 3000);
      } else {
        console.log('Contraseña vacia');
        this.mensaje = 'Contraseña vacia';

      }
    } else {
      console.log('Usuario vacio');
      this.mensaje = 'Usuario Vacio';

    }
  }
}
