import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear-servidor',
  templateUrl: './crear-servidor.page.html',
  styleUrls: ['./crear-servidor.page.scss'],
})
export class CrearServidorPage {
  nombreSala: string = '';
  maxJugadores: number = 20; // Valor predeterminado o inicializar en el constructor
  tipoSala: string = 'publica'; // Valor predeterminado o inicializar en el constructor
  mapaSeleccionado: string = 'mapa1'; // Valor predeterminado o inicializar en el constructor
  usuarioId: number = 1; // Asume que el ID del usuario se obtiene de algún servicio o sesión

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private http: HttpClient
  ) {}

  async crearServidor() {
    if (this.nombreSala && this.maxJugadores && this.tipoSala && this.mapaSeleccionado) {
      const data = {
        nombre_sala: this.nombreSala,
        max_jugadores: this.maxJugadores,
        tipo_sala: this.tipoSala,
        mapa: this.mapaSeleccionado,
        usuario_id: this.usuarioId,
      };

      this.http.post('http://localhost:3000/crear-servidor', data).subscribe(
        async (response) => {
          console.log('Servidor creado:', response);

          const toast = await this.toastController.create({
            message: 'Servidor creado exitosamente',
            duration: 2000,
            color: 'success'
          });
          toast.present();

          this.navCtrl.navigateForward('/servidores-master');
        },
        async (error) => {
          console.error('Error al crear servidor:', error);

          const toast = await this.toastController.create({
            message: 'Error al crear el servidor. Intente nuevamente.',
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
