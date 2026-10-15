import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { IZodiaco } from './izodiaco';

@Component({
  selector: 'app-ver-zodiaco',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './ver-zodiaco.html',
})
export class VerZodiaco implements OnInit {

  zodiacoList: IZodiaco[] = [];
  indiceEdicion: number | null = null;

  anoActual = new Date().getFullYear();
  mesActual = new Date().getMonth() + 1;

  formEdicion!: FormGroup;

  zodiaco: IZodiaco = {
    nombre: '',
    diaNac: '',
    mesNac: '',
    anoNac: '',
    genero: '',

    edad:0,

    signo:'',
  };

  ngOnInit(): void {
    this.formEdicion = new FormGroup({
      nombre: new FormControl(''),
      diaNac: new FormControl(''),
      mesNac: new FormControl(''),
      anoNac: new FormControl(''),
      genero: new FormControl(''),

      edad: new FormControl(''),
      signo: new FormControl(''),

    });

    this.formEdicion.disable();

    this.cargarRegistros();
  }

  cargarRegistros(): void {
    const datos = localStorage.getItem('zodiaco');
    if (datos) {
      try {
        const parsed = JSON.parse(datos);
        this.zodiacoList = Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        this.zodiacoList = [];
      }
    }
  }

  eliminarRegistro(index: number): void {
    this.zodiacoList.splice(index, 1);
    localStorage.setItem('zodiaco', JSON.stringify(this.zodiacoList));

    if (this.indiceEdicion !== null) {
      this.cancelarEdicion();
    }
  }

  editarRegistro(index: number): void {
    this.indiceEdicion = index;
    const item = this.zodiacoList[index];

    this.formEdicion.enable();
    this.formEdicion.patchValue({
      nombre: item.nombre,
      diaNac: item.diaNac,
      mesNac: item.mesNac,
      anoNac: item.anoNac,
      genero: item.genero,

      edad: item.edad,
      signo: item.signo,

    });
  }

  guardarCambios(): void {
  

    if (this.indiceEdicion === null) return;

    this.zodiaco.nombre = this.formEdicion.value.nombre;
    this.zodiaco.diaNac = this.formEdicion.value.diaNac;
    this.zodiaco.mesNac = this.formEdicion.value.mesNac;
    this.zodiaco.anoNac = this.formEdicion.value.anoNac;
    this.zodiaco.genero = this.formEdicion.value.genero;
    this.zodiaco.edad = this.formEdicion.value.edad;

    this.zodiaco.signo = this.formEdicion.value.signo;





    this.zodiacoList[this.indiceEdicion] = { ...this.zodiaco };
    localStorage.setItem('zodiaco', JSON.stringify(this.zodiacoList));

    this.cancelarEdicion();
  }

  cancelarEdicion(): void {
    this.indiceEdicion = null;
    this.formEdicion.reset();
    this.formEdicion.disable();
  }
}