import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { pokemonService } from './getPokemonsService';



export interface pokemons {
  name: string;
  position: number;
  url?: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;



  displayedColumns: string[] = ['position', 'name', 'buton'];
  dataSource = new MatTableDataSource(new Array<pokemons>);
  title = 'pokemon';
  private pokemons: Array<pokemons>;

  constructor(private pokemonsSvc: pokemonService) { }

  async ngAfterViewInit() {
    try {
      await this.pokemonsSvc.getPokemons().toPromise().then((resp: any) => {
        this.pokemons = resp.results as Array<pokemons>;
        this.pokemons.forEach((pokemon, i) => {
          pokemon.position = i + 1;
          delete pokemon.url;  // or delete person["age"];
        });
        this.setDataTable();
      });
    } catch (e) {
      console.log(e);
    }
  }

  setDataTable() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.pokemons;
    this.table.renderRows();
  }

  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  deletePokemon(pokenmon: pokemons) {
    const index = this.pokemons.indexOf((pokenmon), 0);
    if (index > -1) {
      this.pokemons.splice(index, 1);
    }
    this.setDataTable();
  }

}
