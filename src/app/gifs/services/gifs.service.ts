import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SearchGifsResponse, Gif } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = '4DzJpDUoGSYizUtR1D3hQ6Fiu2H81npw';

  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial () {
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {

    this._historial = JSON.parse(localStorage.getItem('history')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('gifs')!) || [];
    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
  }

  searchGifts( query: string ) {

    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10)

      localStorage.setItem('history', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
        .set('api_key', this._apiKey)
        .set('limit', '20')
        .set('q', query)

    this.http.get<SearchGifsResponse>(`${ this.serviceUrl }/search`, { params })
      .subscribe((res) => {
        this.resultados = res.data;

        localStorage.setItem('gifs', JSON.stringify(this.resultados));
      })



  }

}
