import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-servidores-master',
  templateUrl: './servidores-master.page.html',
  styleUrls: ['./servidores-master.page.scss'],
})
export class ServidoresMasterPage implements OnInit {

  servidores: any[] = []; // Arreglo que almacenará los servidores

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Cargar los servidores al iniciar la página
    this.obtenerServidores();
  }

  obtenerServidores() {
    this.http.get<any[]>('http://localhost:3000/servidores') // Endpoint donde se obtienen los servidores
      .subscribe(
        (response) => {
          this.servidores = response;
        },
        (error) => {
          console.error('Error al obtener los servidores', error);
        }
      );
  }

  eliminarServidor(id: number) {
    // Hacer la petición DELETE al servidor
    this.http.delete(`http://localhost:3000/servidores/${id}`)
      .subscribe(
        () => {
          // El servidor fue eliminado, lo eliminamos del arreglo en el frontend
          this.servidores = this.servidores.filter(servidor => servidor.id !== id);
        },
        (error) => {
          console.error('Error al eliminar el servidor', error);
        }
      );
  }
}
