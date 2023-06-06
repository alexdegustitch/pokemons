import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Type } from '../models/type.model';
import { Pokemon } from '../models/pokemon.model';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-pokemon-evolution',
  templateUrl: './pokemon-evolution.component.html',
  styleUrls: ['./pokemon-evolution.component.css']
})
export class PokemonEvolutionComponent implements OnInit {

  constructor(private router: Router, private service: PokemonService) { }

  ngOnInit(): void {
    this.get_all_pokemon();
    $(document).ready(function () {
      $('.selectpicker').selectpicker('refresh');
    });
  }

  pokemon: Pokemon[];
  idPokemon: Number;
  idPokemon1: Number[];
  idPokemon2: Number[];
  message: String;
  message1: String;
  redAlertShow: Boolean;
  greenAlertShow: Boolean;

  get_all_pokemon(): void {
    this.service.get_all_pokemon().subscribe(data => {
      this.pokemon = JSON.parse(JSON.stringify(data));
      $(document).ready(function () {
        $('.selectpicker').selectpicker('refresh');
      });
    })
  }

  add_pokemon_evolution(): void {

    this.message = null;
    this.message1 = null;
    this.greenAlertShow = false;
    this.redAlertShow = false;

    if (this.idPokemon == null) {
      this.redAlertShow = true;
      this.message = "Choose a Pokémon. ";
      return;
    }

    if (this.idPokemon1 == null && this.idPokemon2 != null) {
      this.redAlertShow = true;
      this.message = "You must choose Evolution I Pokémon. ";
      return;
    }


    this.service.get_pokemon_evolution_max_id().subscribe(data => {
      let evolution = JSON.parse(JSON.stringify(data));

      let id: number;
      if (evolution == "") {
        id = 1;
      }
      else {
        id = evolution[0].id + 1;
      }

      if (this.idPokemon1 == null && this.idPokemon2 == null) {
        this.service.add_pokemon_evolution(id++, this.idPokemon, 0, 0).subscribe(data => {
          this.idPokemon1 = null;
          this.idPokemon2 = null;
          this.idPokemon = null;
          $(document).ready(function () {
            $('.selectpicker').selectpicker('refresh');
          });
          if (data['ok'] == 'no') {
            this.message = "Error has occured.";
            this.redAlertShow = true;
            return;
          }
          else {
            this.message1 = "Evolution for this Pokémon is added. ";
            this.greenAlertShow = true;
            return;
          }

        })
      } else if (this.idPokemon1 != null && this.idPokemon2 == null) {

        for (var index1 in this.idPokemon1) {
          this.service.add_pokemon_evolution(id++, this.idPokemon, this.idPokemon1[index1], 0).subscribe(data => {
            if (data['ok'] == 'no') {
              this.message = "Error has occured.";
              this.redAlertShow = true;
              $(document).ready(function () {
                $('.selectpicker').selectpicker('refresh');
              });
              return;
            }
            else {
              this.message1 = "Evolution for this Pokémon is added. ";
              this.greenAlertShow = true;
            }
            if (Number(index1) == (this.idPokemon1.length - 1)) {
              
              $(document).ready(function () {
                $('.selectpicker').selectpicker('refresh');
              });
            }
          })
        }
      } else {
        for (var index1 in this.idPokemon1) {
          for (var index2 in this.idPokemon2) {
            this.service.add_pokemon_evolution(id++, this.idPokemon, this.idPokemon1[index1], this.idPokemon2[index2]).subscribe(data => {
              if (data['ok'] == 'no') {
                this.message = "Error has occured.";
                this.redAlertShow = true;
                $(document).ready(function () {
                  $('.selectpicker').selectpicker('refresh');
                });
                return;
              }
              else {
                this.message1 = "Evolution for this Pokémon is added. ";
                this.greenAlertShow = true;
              }
              if ((Number(index1) + (Number(index2)) == (this.idPokemon1.length + this.idPokemon2.length - 2))) {
                
                $(document).ready(function () {
                  $('.selectpicker').selectpicker('refresh');
                });
              }
            })
          }

        }
      }


    })

  }

  clear_fields(): void {
    //alert(this.idMainAttack.length);
    this.idPokemon = null;
    this.idPokemon1 = null;
    this.idPokemon2 = null;

    this.redAlertShow = null;
    this.greenAlertShow = null;

    $(document).ready(function () {
      $('.selectpicker').selectpicker('refresh');
    });
  }
}
