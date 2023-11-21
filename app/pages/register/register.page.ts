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
import { Usuario } from '../interfaces/interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  newUsuario: Usuario={
    nombreCompleto:'',
    password: '',
    email:'',
    sede:'',
    asignatura:'',
    ano:0,
    semestre:'',
    horas_sem: 0,
    role:'',
    isactive: false
  }

  userdata: any;
  registerForm: FormGroup;

  constructor(private menuController: MenuController,
              private alertController: AlertController,
              private router: Router,
              private authservice: AuthService,
              private toastcontroller: ToastController,
              private fbuilder: FormBuilder) {
                this.registerForm = this.fbuilder.group({
                  'nombreCompleto'  : new FormControl("", [Validators.required]),
                  'password'  : new FormControl("", [Validators.required, Validators.minLength(8)]),
                  'email'  : new FormControl("", [Validators.required]),
                  'username'  : new FormControl("", [Validators.required, Validators.minLength(3)]),
                  'sede'  : new FormControl("", [Validators.required]),
                  'rol'  : new FormControl("", Validators.required),
                  'asignatura'  : new FormControl("", [Validators.required]),
                  'ano'  : new FormControl("", [Validators.required]),
                  'horas_sem'  : new FormControl("", [Validators.required])
                })
               }

  ngOnInit() {
  }

  mostrarMenu(){
    this.menuController.open('first');
  }


  registrar(){
    this.newUsuario.nombreCompleto = this.registerForm.value.nombreCompleto;
    this.newUsuario.password = this.registerForm.value.password;
    this.newUsuario.role = this.registerForm.value.rol;
    this.newUsuario.isactive = true;
    this.newUsuario.email = this.registerForm.value.email;
    this.newUsuario.asignatura = this.registerForm.value.asignatura;
    this.newUsuario.sede = this.registerForm.value.sede;
    this.newUsuario.ano = this.registerForm.value.ano;
    this.newUsuario.semestre = this.registerForm.value.semestre;
    this.newUsuario.horas_sem = this.registerForm.value.horas_sem;
    this.authservice.CrearUsuario(this.newUsuario).subscribe();
    console.log('Holi');
    this.router.navigateByUrl("/login");
  }

  Registrarse() {
    if (this.registerForm.valid) {
      this.authservice.GetUserById(this.registerForm.value.email).subscribe(resp=>{
        this.userdata = resp;

        if(this.userdata.length>0 ){
          this.Error();
        }
        else{
          this.authservice.CrearUsuario(this.registerForm.value).subscribe(() => {
            this.showToast('Usuario Registrado');
          });
          this.router.navigateByUrl("/login");
        }
      })
    }
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

  async showToast(msg: any){
    const toast = await this.toastcontroller.create({
      message: msg,
      duration: 3000
    })
    toast.present();
  }

  async MostrarMensaje() {
    const alert = await this.alertController.create({
      header: 'Gracias!',
      message: 'Se han enviado sus datos!',
      buttons: ['OK'],
    });
    await alert.present();
  }

}