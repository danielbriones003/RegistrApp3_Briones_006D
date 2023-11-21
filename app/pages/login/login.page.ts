import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FormGroup,
         FormControl,
         Validators,
         FormBuilder} from '@angular/forms';     
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userdata: any;
  loginForm: FormGroup;

  usuario={
    id:0,
    email:"",
    password:"",
    isactive: false
  }

  constructor(private menuController: MenuController,
              private alertController: AlertController,
              private authservice: AuthService,
              private router: Router,
              private toastcontroller: ToastController,
              private fbuilder: FormBuilder) {
                this.loginForm = this.fbuilder.group({
                  'email' : new FormControl("", [Validators.required, Validators.minLength(8)]),
                  'password'  : new FormControl("", [Validators.required, Validators.minLength(8)])
                })
               }


  async MostrarMensaje() {
    const alert = await this.alertController.create({
      header: 'Gracias!',
      message: 'Se han enviado sus datos!',
      buttons: ['OK'],
    });
    await alert.present();
  }

  mostrarMenu(){
    this.menuController.open('first');
  }
  
  ngOnInit() {
  }

  login(){
    if (this.loginForm.valid){
      this.authservice.GetUserById(this.loginForm.value.email).subscribe(resp=>{
        this.userdata = resp;
        console.log(this.userdata);
        if (this.userdata.length > 0){    // si es mayor a cero, se ha encontrado el usuario
          this.usuario ={
            id : this.userdata[0].id,
            email: this.userdata[0].email,
            password: this.userdata[0].password,
            isactive: this.userdata[0].isactive
          }
          if (this.usuario.password === this.loginForm.value.password){
            if (this.usuario.isactive){
            //iniciamos session
            sessionStorage.setItem('email', this.usuario.email);
            sessionStorage.setItem('password', this.userdata.password);
            sessionStorage.setItem('ingresado', 'true');
            this.showToast('Sesión iniciada');
            this.router.navigateByUrl("/inicio");
            }
            else{
              this.UserInactivo();
            }
          }
          else{
            this.Error();
          }
        }
        else{
          this.NoExiste();
          this.loginForm.reset();
        }

      })
    }
  }//fin de login


  Enviar(){
    console.log('Iniciando sesion')
    this.MostrarMensaje();
    this.usuario.email='';
    this.usuario.password='';
  }
  
  async showToast(msg: any){
    const toast = await this.toastcontroller.create({
      message: msg,
      duration: 3000
    })
    toast.present();
  }

  async UserInactivo(){
    const alerta = await this.alertController.create({
      header: 'Error..',
      message: 'Usuario inactivo..',
      buttons: ['Ok']
    });
    alerta.present();
    return;
  }

  async Error(){
    const alerta = await this.alertController.create({
      header: 'Error..',
      message: 'Revise sus credenciales..',
      buttons: ['Ok']
    });
    alerta.present();
    return;
  }

  async NoExiste(){
    const alerta = await this.alertController.create({
      header: 'Error..',
      message: 'Usuario debe registrarse..',
      buttons: ['Ok']
    });
    alerta.present();
    return;
  }




}
