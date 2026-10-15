import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

import { IZodiaco } from './izodiaco';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  styleUrl: './zodiaco.css',
  templateUrl: './zodiaco.html',
})
export class Zodiaco implements OnInit {

  edad: number = 0;
  rango!: number;
  animal!: string;
  imagen!: string;

  anoActual = new Date().getFullYear();
  mesActual = new Date().getMonth() + 1;

  formulario!: FormGroup;

  zodiaco: IZodiaco = {
    nombre: '',
    diaNac: '',
    mesNac: '',
    anoNac: '',
    genero: '',

    edad: 0,

    signo:'',
  };

  zodiacoList: IZodiaco[] = [];

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      diaNac: new FormControl(''),
      mesNac: new FormControl(''),
      anoNac: new FormControl(''),
      genero: new FormControl(''),
    });
  }

  Calcular(): void {
    this.zodiaco.nombre = this.formulario.value.nombre;
    this.zodiaco.diaNac = this.formulario.value.diaNac;
    this.zodiaco.mesNac = this.formulario.value.mesNac;
    this.zodiaco.anoNac = this.formulario.value.anoNac;
    this.zodiaco.genero = this.formulario.value.genero;

   this.edad = this.anoActual - parseInt(this.zodiaco.anoNac);

    if (this.mesActual < parseInt(this.zodiaco.mesNac)) {
      this.edad--;
    }

   this.zodiaco.edad = this.edad;


  

    this.rango = parseFloat(this.zodiaco.anoNac) % 12;

    if (this.rango == 0) {
      this.animal = 'Mono';
      this.imagen = 'imagenes/mono.png';
      this.zodiaco.signo = 'Mono';
    } else if (this.rango == 1) {
      this.animal = 'Gallo';
      this.imagen = 'imagenes/gallo.png';
      this.zodiaco.signo = 'Gallo';
    } else if (this.rango == 2) {
      this.animal = 'Perro';
      this.imagen = 'imagenes/perro.png';
      this.zodiaco.signo = 'Perro';
    } else if (this.rango == 3) {
      this.animal = 'Cerdo';
      this.imagen = 'imagenes/cerdo.png';
      this.zodiaco.signo = 'Cerdo';
    } else if (this.rango == 4) {
      this.animal = 'Rata';
      this.imagen = 'imagenes/rata.png';
    } else if (this.rango == 5) {
      this.animal = 'Buey';
      this.imagen = 'imagenes/buey.png';
       this.zodiaco.signo = 'Buey';
    } else if (this.rango == 6) {
      this.animal = 'Tigre';
      this.imagen = 'imagenes/tigre.png';
      this.zodiaco.signo = 'Tigre';

    } else if (this.rango == 7) {
      this.animal = 'Conejo';
      this.imagen = 'imagenes/conejo.png';
      this.zodiaco.signo = 'Conejo';

    } else if (this.rango == 8) {
      this.animal = 'Dragon';
      this.imagen = 'imagenes/dragon.png';
      this.zodiaco.signo = 'Dragon';

    } else if (this.rango == 9) {
      this.animal = 'Serpiente';
      this.imagen = 'imagenes/serpiente.png';
      this.zodiaco.signo = 'Serpiente';

    } else if (this.rango == 10) {
      this.animal = 'Caballo';
      this.imagen = 'imagenes/caballo.png';
      this.zodiaco.signo = 'Caballo';

    } else if (this.rango == 11) {
      this.animal = 'Cabra';
      this.imagen = 'imagenes/cabra.png';
      this.zodiaco.signo = 'Cabra';

    }
  const guardados = localStorage.getItem('zodiaco');
    if (guardados) {
      this.zodiacoList = JSON.parse(guardados);
    }

    this.zodiacoList.push({ ...this.zodiaco });
    localStorage.setItem('zodiaco', JSON.stringify(this.zodiacoList));
 
  }

}