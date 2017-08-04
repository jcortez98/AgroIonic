import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import {AuthService } from './auth.service'

@Injectable()
export class PreguntaService {
    private headers:Headers;
    private url:string;

  constructor( private http:Http, private auth:AuthService) {
      this.url = "http://localhost:3000/api/v1/pregunta/";
      let config = {
          'Content-Type': 'application/json',
          'Authorization': this.auth.getToken()
      }
      this.headers = new Headers(config);
  }
  public getPreguntas(){
      return this.http.get(this.url, {headers:this.headers}).map(res => {
          return res.json();
      })
  }
  public addPregunta(pregunta:any){
      let data = JSON.stringify(pregunta);
      console.log(data);
      return this.http.post(this.url,data,{headers: this.headers}).map(res =>{
        console.log(res.json())
          return res.json();
      });
  }
  public updatePregunta(pregunta:any){
      let data = JSON.parse(JSON.stringify(pregunta));
      return this.http.put(this.url+pregunta.idPregunta
        ,data).map(res =>{
          return res.json();
      })
  }

  public buscarPregunta(id:any){
      return this.http.get(this.url+"buscar/"+id).map(res =>{
          return res.json();
      })

  }
  public eliminarPregunta(id:any){
      return this.http.delete(this.url+id).map(res => {
          return res.json();
      })
  }
  public getPregunta(){
      return this.http.get('http://localhost:3000/api/pregunta/user/'+localStorage.getItem('idUsuario')).map(res =>{
          return res.json();
      })
  }
}
