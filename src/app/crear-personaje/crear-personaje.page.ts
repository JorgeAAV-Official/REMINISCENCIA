import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear-personaje',
  templateUrl: './crear-personaje.page.html',
  styleUrls: ['./crear-personaje.page.scss'],
})
export class CrearPersonajePage {
  // Campos obligatorios
  nombre: string = '';
  edad: number | null = null;
  estatura: number | null = null;

  // Variables para la primera sección (total = 72)
  fuerza = 1;
  destreza = 1;
  constitucion = 1;
  inteligencia = 1;
  sabiduria = 1;
  apariencia = 1;
  totalCaracteristicas1 = 72;

  // Variables para la segunda sección (total = 34)
  musculatura = 1;
  punteria = 1;
  salud = 1;
  totalCaracteristicas2 = 34;

  // Variables para la tercera sección (total = 75)
  estamina = 1;
  balance = 1;
  resistencia = 1;
  conocimiento = 1;
  fVoluntad = 1;
  carisma = 1;
  totalCaracteristicas3 = 75;

  // Variables para la cuarta sección (total = 34)
  logica = 1;
  intuicion = 1;
  verborrea = 1;
  totalCaracteristicas4 = 34;

  // ID del servidor actual (este valor se debería obtener de la sesión o contexto actual)
  servidorId: number = 20; // Asegúrate de obtener este valor dinámicamente según el servidor actual

  constructor(private navCtrl: NavController, private http: HttpClient) {}

  // Métodos de validación para cada sección
  checkTotalCaracteristicas1(): boolean {
    const total = this.fuerza + this.destreza + this.constitucion + this.inteligencia + this.sabiduria + this.apariencia;
    return total === this.totalCaracteristicas1;
  }

  checkTotalCaracteristicas2(): boolean {
    const total = this.musculatura + this.punteria + this.salud;
    return total === this.totalCaracteristicas2;
  }

  checkTotalCaracteristicas3(): boolean {
    const total = this.estamina + this.balance + this.resistencia + this.conocimiento + this.fVoluntad + this.carisma;
    return total === this.totalCaracteristicas3;
  }

  checkTotalCaracteristicas4(): boolean {
    const total = this.logica + this.intuicion + this.verborrea;
    return total === this.totalCaracteristicas4;
  }

  // Método para navegar a la siguiente página solo si la sumatoria es correcta
  ItemsMaster() {
    if (
      this.checkTotalCaracteristicas1() &&
      this.checkTotalCaracteristicas2() &&
      this.checkTotalCaracteristicas3() &&
      this.checkTotalCaracteristicas4()
    ) {
    } else {
      alert('Revisa que todos los totales sean correctos antes de continuar.');
    }
  }
}
