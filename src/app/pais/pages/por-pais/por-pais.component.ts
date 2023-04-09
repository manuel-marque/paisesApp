import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css']
})
export class PorPaisComponent {
  termino: string = ''
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias:boolean = false;

  constructor(private paisService: PaisService){}

  buscar(termino: string){
    this.hayError = false;
    this.termino = termino;
    // console.log(this.termino);
    this.mostrarSugerencias = false;

    this.paisService.buscarPais(this.termino).subscribe({
      next: (paises) => {
      console.log(paises);
      this.paises = paises;
    }, error: (err) => {
      console.log('Error');
      console.info(err);
      this.hayError = true;
      this.paises = [];
    }});
  }

  sugerencias(termino: string){
    this.hayError = false;
    this.termino = termino;
    //TODO crear sugerencias
    this.mostrarSugerencias = true
    this.paisService.buscarPais(termino).subscribe(
      paises => this.paisesSugeridos = paises.splice(0,5),
      (err) => this.paisesSugeridos = []
    );


  }

  buscarSugerencia(termino: string){
    this.buscar(termino);

  }

}
