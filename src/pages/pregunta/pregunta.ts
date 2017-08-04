import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PreguntaService } from '../../app/services/pregunta.service';
import { PreguntaFormPage } from './pregunta-form'

@Component({
  selector: 'page-pregunta',
  templateUrl: 'pregunta.html',
})
export class PreguntaPage {
  private preguntas:any[] = [];

  constructor(
    public navCtrl: NavController,
    public preguntaService: PreguntaService
  ) {
    this.inicializar();
  }
  ionViewWillEnter(){
    this.inicializar();
  }
  private inicializar() {
    this.preguntaService.getPreguntas()
    .subscribe(preguntas => this.preguntas = preguntas);
  }

  public verForm(parametro) {
    this.navCtrl.push(PreguntaFormPage, {parametro});
  }
}
