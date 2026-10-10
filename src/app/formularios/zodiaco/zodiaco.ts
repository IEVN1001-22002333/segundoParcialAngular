import { Component } from '@angular/core';
import { FormGroup , FormControl , FormsModule ,ReactiveFormsModule } from '@angular/forms';
import {IZodiaco} from './izodiaco';

@Component({
  imports: [FormsModule,ReactiveFormsModule],
  selector: 'app-zodiaco',
  styleUrl: './zodiaco.css',
  templateUrl: './zodiaco.html',
})
export class Zodiaco {

  edad: number = 0;
  rango: number;
  animal: string;
  imagen: string;

  anoActual = new Date().getFullYear();
  mesActual = new Date().getMonth() + 1;

  formulario!: FormGroup;

  zodiaco: IZodiaco = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    diaNac: '',
    mesNac: '',
    anoNac: '',
    genero: '',
  };

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      apellidoPaterno: new FormControl(''),
      apellidoMaterno: new FormControl(''),
      diaNac: new FormControl(''),
      mesNac: new FormControl(''),
      anoNac: new FormControl(''),
      genero: new FormControl(''),
    });
  }

  Calcular(): void {
    this.zodiaco.nombre = this.formulario.value.nombre;
    this.zodiaco.apellidoPaterno = this.formulario.value.apellidoPaterno;
    this.zodiaco.apellidoMaterno = this.formulario.value.apellidoMaterno;
    this.zodiaco.diaNac = this.formulario.value.diaNac;
    this.zodiaco.mesNac = this.formulario.value.mesNac;
    this.zodiaco.anoNac = this.formulario.value.anoNac;
    this.zodiaco.genero = this.formulario.value.genero;

    this.rango = parseFloat(this.zodiaco.anoNac) % 12;

    if (this.rango == 0) {
      this.animal = 'Mono';
      this.imagen = '/imagenes/mono.png';
    } else if (this.rango == 1) {
      this.animal = 'Gallo';
      this.imagen = '/imagenes/gallo.png';
    } else if (this.rango == 2) {
      this.animal = 'Perro';
      this.imagen = '/imagenes/perro.png';
    } else if (this.rango == 3) {
      this.animal = 'Cerdo';
      this.imagen = '/imagenes/cerdo.png';
    } else if (this.rango == 4) {
      this.animal = 'Rata';
      this.imagen = '/imagenes/rata.png';
    } else if (this.rango == 5) {
      this.animal = 'Buey';
      this.imagen = '/imagenes/buey.png';
    } else if (this.rango == 6) {
      this.animal = 'Tigre';
      this.imagen = '/imagenes/tigre.png';
    } else if (this.rango == 7) {
      this.animal = 'Conejo';
      this.imagen = '/imagenes/conejo.png';
    } else if (this.rango == 8) {
      this.animal = 'Dragon';
      this.imagen = '/imagenes/dragon.png';
    } else if (this.rango == 9) {
      this.animal = 'Serpiente';
      this.imagen = '/imagenes/serpiente.png';
    } else if (this.rango == 10) {
      this.animal = 'Caballo';
      this.imagen = '/imagenes/caballo.png';
    } else if (this.rango == 11) {
      this.animal = 'Cabra';
      this.imagen = '/imagenes/cabra.png';
    }

    this.edad = this.anoActual - parseInt(this.zodiaco.anoNac);

    if (this.mesActual < parseInt(this.zodiaco.mesNac)) {
      this.edad--;
    }
  }
}