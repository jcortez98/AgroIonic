import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { PreguntaService } from '../../app/services/pregunta.service';
import { PreguntaPage } from './pregunta';

@Component({
  selector: 'page-pregunta-form',
  templateUrl: 'pregunta-form.html'
})
export class PreguntaFormPage {
  private accion = true;
  private pregunta:any = {
    nombre: "",
    telefono: "",
    correo: "",
    descripcion: "",
    idUsuario: localStorage.getItem('idUsuario')
  };
  private parametro:string;
  private encabezado:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastController,
    public preguntaService: PreguntaService
  ) {
    this.parametro = this.navParams.get('parametro');
    if(this.parametro != 'nuevo') {
      this.encabezado = "Editar pregunta";
      this.preguntaService.buscarPregunta(this.parametro)
      .subscribe(pregunta => {
        this.pregunta.nombre = pregunta[0].nombre,
        this.pregunta.telefono = pregunta[0].telefono,
        this.pregunta.correo = pregunta[0].correo,
        this.pregunta.descripcion = pregunta[0].descripcion,
        console.log(pregunta);

      });
      this.accion = false;
    } else {
      this.encabezado = "Nuevo pregunta";
    }
  }

  public guardar() {
    if (this.accion){
      this.preguntaService.addPregunta(this.pregunta)
      .subscribe(res => {
        this.toast.create({
          message: res.mensaje,
          duration: 2000
        }).present();
        if(res.estado) {
          this.navCtrl.getPrevious();
        } else {
          this.pregunta.nombre = "";
          this.pregunta.telefono = "";
          this.pregunta.correo = "";
          this.pregunta.descripcion = "";
          this.pregunta.idUsuario = 1;
        }
      });
    }else {
      this.preguntaService.updatePregunta(this.pregunta).subscribe(res =>{
        this.toast.create({
          message: res.mensaje,
          duration: 2000
        }).present();
          this.navCtrl.getPrevious();
      });
    }
  }
  public eliminar(){
    this.preguntaService.eliminarPregunta(this.pregunta.idPregunta).subscribe(res =>{
      this.toast.create({
        message: res.mensaje,
        duration: 2000
      }).present();
      this.navCtrl.getPrevious();
    });
  }
}
