import { Component, OnInit } from '@angular/core';

import { PokemonService } from '../pokemon.service';
import { Type } from '../models/type.model';
import { Pokemon } from '../models/pokemon.model';
import { FastAttack } from '../models/fastAttack.model';
import { MainAttack } from '../models/mainAttack';
import { PokemonFastAttack } from '../models/pokemonFastAttack.model';
import { PokemonMainAttack } from '../models/pokemonMainAttack.model';
import { PokemonDetails } from '../models/pokemonDetails';

import { Router } from '@angular/router';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';

declare var $: any;

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {

  constructor(private router: Router, private service: PokemonService) { }

  ngOnInit(): void {
    this.percentage = new Array<Number>(19);

    this.get_all_pokemon();
    this.get_all_types();

  }

  types: Type[];
  idPokemon: Number;
  pokemon: Pokemon[];
  message: String;
  percentage: Number[];
  added: Boolean;
  updated: Boolean;
  not_added: Boolean;

  get_all_pokemon(): void {
    this.service.get_all_pokemon().subscribe(data => {
      this.pokemon = JSON.parse(JSON.stringify(data));
      $(document).ready(function () {
        $('.selectpicker').selectpicker('refresh');
      });
    })
  }

  get_all_types(): void {
    this.service.get_all_types_asc().subscribe(data => {
      this.types = JSON.parse(JSON.stringify(data));
      this.clear_fields();
    })
  }

  clear_fields(): void {
    //alert();
    this.added = null;
    this.idPokemon = null;
    this.updated = null;
    this.not_added = null;

    this.percentage[0] = 100;
    this.percentage[1] = 100;
    this.percentage[2] = 100;
    this.percentage[3] = 100;
    this.percentage[4] = 100;
    this.percentage[5] = 100;
    this.percentage[6] = 100;
    this.percentage[7] = 100;
    this.percentage[8] = 100;
    this.percentage[9] = 100;
    this.percentage[10] = 100;
    this.percentage[11] = 100;
    this.percentage[12] = 100;
    this.percentage[13] = 100;
    this.percentage[14] = 100;
    this.percentage[15] = 100;
    this.percentage[16] = 100;
    this.percentage[17] = 100;
    this.percentage[18] = 100;



    $(document).ready(function () {
      $('.selectpicker').selectpicker('refresh');

    });
  }

  save(): void {
    this.added = false;
    this.updated = false;
    this.not_added = false;

    if (this.idPokemon == null) {
      this.message = "Select a Pokémon. ";
      this.not_added = true;
      return;
    }

    for (var index in this.percentage) {
      if (isNaN(Number(this.percentage[index]))) {
        this.message = "Only numbers are allowed. ";
        this.not_added = true;
        return;
      }
    }

    this.service.find_pokemon_details_by_id(this.idPokemon).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      if (res == null) {
        
        this.service.get_pokemon_details_max_id().subscribe(data => {
          let details = JSON.parse(JSON.stringify(data));
          
          let id: number;
          if(details==""){
            id = 1;
          }
          else{
            id = details[0].id + 1;
          }
          for (let index in this.percentage) {
            if (Number(index) != 0) {
              this.service.add_pokemon_details(id++, this.idPokemon, this.types[index].id, this.percentage[index]).subscribe(data => {
                if (data['ok'] == 'no') {
                  this.message = "Error has occured.";
                  this.not_added = true;
                  return;
                }
                if (Number(index) == (this.percentage.length - 1)) {
                  this.message = "Pokémon's details are added.";
                  this.added = true;
                  this.clear_all_not_alerts();
                }
              })
            }
          }
        })

      } else {
        for (let index in this.percentage) {
          if (Number(index) != 0) {
            this.service.find_pokemon_details_by_pokemon_and_type(this.idPokemon, this.types[index].id).subscribe(data => {
              let res = JSON.parse(JSON.stringify(data));
              //alert(res);
              this.service.update_pokemon_details(res.id, this.percentage[index]).subscribe(data => {
                if (data['ok'] == 'no') {
                  this.message = "Error has occured.";
                  this.not_added = true;
                  return;
                }
                if (Number(index) == (this.percentage.length - 1)) {
                  this.message = "Pokémon's details are changed. ";
                  this.updated = true;
                  this.clear_all_not_alerts();
                }
              })
            })
          }
        }

      }
    })

  }

  clear_all_not_alerts(): void {
    this.idPokemon = null;
    this.percentage[0] = 100;
    this.percentage[1] = 100;
    this.percentage[2] = 100;
    this.percentage[3] = 100;
    this.percentage[4] = 100;
    this.percentage[5] = 100;
    this.percentage[6] = 100;
    this.percentage[7] = 100;
    this.percentage[8] = 100;
    this.percentage[9] = 100;
    this.percentage[10] = 100;
    this.percentage[11] = 100;
    this.percentage[12] = 100;
    this.percentage[13] = 100;
    this.percentage[14] = 100;
    this.percentage[15] = 100;
    this.percentage[16] = 100;
    this.percentage[17] = 100;
    this.percentage[18] = 100;



    $(document).ready(function () {
      $('.selectpicker').selectpicker('refresh');

    });
  }
}
