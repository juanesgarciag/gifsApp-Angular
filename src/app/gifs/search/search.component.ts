import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  buscar() {

    const valor = this.txtBuscar.nativeElement.value;

    if(valor.trim().length === 0){
      alert('Debes ingresar un termino a buscar');
      return;
    }
    
    this.gifsService.searchGifts(valor);

    this.txtBuscar.nativeElement.value = '';
  }

}
