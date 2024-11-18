import { Component} from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-eleccion-master',
  templateUrl: './eleccion-master.page.html',
  styleUrls: ['./eleccion-master.page.scss'],
})
export class EleccionMasterPage {

  constructor(private navCtrl: NavController) { }

  CrearServidor() {
    this.navCtrl.navigateForward('/crear-servidor');
  }

  servidoresCreados() {
    this.navCtrl.navigateForward('/servidores-master');
  }
}
