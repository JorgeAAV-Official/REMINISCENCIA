import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string = '';
  contrasena: string = '';
  rol: string = '';

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  Registrarse() {
    this.navCtrl.navigateForward('/registro');
  }

  async login() {
    if (this.usuario && this.contrasena && this.rol) {
      const data = {
        usuario: this.usuario,
        contrasena: this.contrasena,
        rol: this.rol,
      };

      this.http.post('http://localhost:3000/login', data)
        .subscribe(
          async (response: any) => {
            if (response.success) {
              const toast = await this.toastController.create({
                message: 'Inicio de sesión exitoso',
                duration: 2000,
                color: 'success'
              });
              toast.present();
              
              // Redirigir a la página correspondiente según el rol
              if (response.role === 'master') {
                this.navCtrl.navigateForward('/eleccion-master'); // Cambia esto por tu página para "master"
              } else if (response.role === 'player') {
                this.navCtrl.navigateForward('/servidores-player'); // Cambia esto por tu página para "player"
              }
            } else {
              const toast = await this.toastController.create({
                message: 'Usuario, contraseña o rol incorrectos',
                duration: 2000,
                color: 'danger'
              });
              toast.present();
            }
          },
          async error => {
            console.error('Error al iniciar sesión:', error);
            const toast = await this.toastController.create({
              message: 'Error al iniciar sesión. Intente nuevamente.',
              duration: 2000,
              color: 'danger'
            });
            toast.present();
          }
        );
    } else {
      const toast = await this.toastController.create({
        message: 'Por favor, complete todos los campos',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }
}
