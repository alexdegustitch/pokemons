import { Component, OnInit } from '@angular/core';

import { PokemonService } from '../pokemon.service';
import { Type } from '../models/type.model';
import { Pokemon } from '../models/pokemon.model';

import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-all-pokemon',
  templateUrl: './all-pokemon.component.html',
  styleUrls: ['./all-pokemon.component.css']
})
export class AllPokemonComponent implements OnInit {

  constructor(private router: Router, private service: PokemonService) { }

  ngOnInit(): void {

    this.get_all_types();
    this.get_all_pokemon();
  }

  types: Type[];
  current_type: number;
  pokemon: Pokemon[];

  get_all_types(): void {

    this.service.get_only_types().subscribe(data => {

      this.types = JSON.parse(JSON.stringify(data));


    })
  }

  get_all_pokemon(): void {
    this.service.get_all_pokemon().subscribe(data => {
      this.pokemon = JSON.parse(JSON.stringify(data));
    })
  }

  get_all_pokemon_by_type(idType: Number): void {
    this.service.find_all_pokemon_by_type(idType).subscribe(data => {
      this.pokemon = JSON.parse(JSON.stringify(data));
    })
  }

  type_clicked(type: number): void {

    let cr = this.current_type;
    if (this.current_type != null || this.current_type == type) {

      $(document).ready(function () {
        $("#" + cr).css("border", "0px");
      });
    }
    if (this.current_type != type) {
      this.current_type = type;
      let color = this.types[type - 1].color + " solid 3px";
      $(document).ready(function () {
        $("#" + type).css("border", color);

        $("#" + type).css("border-radius", "20%");
      });
      this.get_all_pokemon_by_type(type);
    }
    else {
      this.get_all_pokemon();
      this.current_type = null;
    }

  }

}
