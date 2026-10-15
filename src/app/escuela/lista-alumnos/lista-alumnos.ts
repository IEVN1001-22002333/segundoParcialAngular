import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IAlumnos } from './alumnos';

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrl: './lista-alumnos.css',
  templateUrl: './lista-alumnos.html'
})
export class ListaAlumnos implements OnInit {

  formulario!: FormGroup;
  alumnos: IAlumnos[] = [];
  indiceEdicion: number = -1;
  
  alumno: IAlumnos = {
    materia: '',
    nombre: '',
    correo: '',
    matricula: ''
  };

  ngOnInit(): void {
    this.formulario = new FormGroup({
      matricula: new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      materia: new FormControl('')
    });

    this.cargarAlumnos();
  }

  agregarAlumnos(): void {
    if (
      this.alumno.matricula === '' ||
      this.alumno.nombre === '' ||
      this.alumno.correo === '' ||
      this.alumno.materia === ''
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (this.indiceEdicion >= 0) {
      this.alumnos[this.indiceEdicion] = { ...this.alumno };
      this.indiceEdicion = -1;
    } else {
      this.alumnos.push({ ...this.alumno });
    }

    localStorage.setItem('alumnos', JSON.stringify(this.alumnos));

    this.limpiarFormulario();
  }

  limpiarFormulario(): void {
    this.formulario.reset();
    this.indiceEdicion = -1;
    this.alumno = {
      materia: '',
      nombre: '',
      correo: '',
      matricula: ''
    };
  }

  muestraAlumnos(): void {
    this.alumno.matricula = this.formulario.value.matricula;
    this.alumno.nombre = this.formulario.value.nombre;
    this.alumno.correo = this.formulario.value.correo;
    this.alumno.materia = this.formulario.value.materia;

    this.agregarAlumnos();
  }

  cargarAlumnos(): void {
    const datos = localStorage.getItem('alumnos');

    if (datos) {
      this.alumnos = JSON.parse(datos);
    }
  }

  editarAlumnos(index: number): void {
    this.alumno = {
      ...this.alumnos[index]
    };
    const alumnoEdit = this.alumnos[index];
    this.formulario.patchValue({
      matricula: alumnoEdit.matricula,
      nombre: alumnoEdit.nombre,
      correo: alumnoEdit.correo,
      materia: alumnoEdit.materia,
    });
    this.indiceEdicion = index;
  }

  eliminarAlumno(index: number): void {
    this.alumnos.splice(index, 1);
    localStorage.setItem('alumnos', JSON.stringify(this.alumnos));
  }
}