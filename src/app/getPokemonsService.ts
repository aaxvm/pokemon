import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class pokemonService {
    private url = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    constructor(private http: HttpClient) { }

    getPokemons() {
        return this.http.get(this.url);
    }
}