import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Palabra } from '../interfaces/interfaces';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular/';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  public mensaje: string;

  //npm install -D @types/qrcode --save

  data={
    texto:''
  }

  nombre: any;

  newPalabra:Palabra={
    email:'',
    texto:''
  }

  constructor(private apicrud: AuthService,
              private alertcontroller: AlertController,
              private menuController: MenuController) { 
    this.mensaje='Hola Mundo';
    this.nombre = sessionStorage.getItem('email');
   }

  ngOnInit() {
  }

  mostrarMenu(){
    this.menuController.open('first');
  }

  generarQr(){
    this.mensaje = this.data.texto;
    this.newPalabra.email = this.nombre;
    this.newPalabra.texto = this.mensaje;
    this.apicrud.CrearPalabra(this.newPalabra).subscribe();
    this.mostrarMensaje();
    this.data.texto='';
  }

  async mostrarMensaje(){
    const alerta= await this.alertcontroller.create({
      header: "Palabra creada!",
      message: "Se ha almacenado su Qr",
      buttons: ['Ok']
    })
    alerta.present();
  }


}
