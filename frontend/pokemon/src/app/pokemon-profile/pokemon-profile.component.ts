import { Component, OnInit } from '@angular/core';

import { PokemonService } from '../pokemon.service';
import { Type } from '../models/type.model';
import { FastAttack } from '../models/fastAttack.model';
import { MainAttack } from '../models/mainAttack';
import { Pokemon } from '../models/pokemon.model';
import { ActivatedRoute } from '@angular/router';
import { PokemonEvolution } from '../models/pokemonEvolution.model';

declare var $: any;

@Component({
  selector: 'app-pokemon-profile',
  templateUrl: './pokemon-profile.component.html',
  styleUrls: ['./pokemon-profile.component.css']
})
export class PokemonProfileComponent implements OnInit {

  constructor(private router: ActivatedRoute, private service: PokemonService) { }

  ngOnInit(): void {
    let id = this.router.snapshot.params.id;
    this.find_pokemon_by_id(id);

  }

  pokemon: Pokemon;
  quick_attacks: FastAttack[];
  main_attacks: MainAttack[];
  pokemon_evolution: PokemonEvolution[];
  evolution: Boolean;
  message: String;
  br_evolution: Number;
  first: Number;
  second: Number[];
  third: Number[];
  exist: Boolean;

  find_pokemon_by_id(id: Number): void {
    this.quick_attacks = new Array;
    this.main_attacks = new Array;
    this.service.find_pokemon_by_id(id).subscribe(data => {
      this.pokemon = JSON.parse(JSON.stringify(data));
      this.service.find_pokemon_details_by_pokemon_and_type(id, 1).subscribe(data=>{
        let i = JSON.parse(JSON.stringify(data));
        localStorage.setItem("ima", i);
        if(i!=null){
          this.exist = true;
        }
      })
      //alert('hej');
      this.service.find_type_by_id(this.pokemon.type1).subscribe(data => {
        let type = JSON.parse(JSON.stringify(data));
        //localStorage.setItem('boja', type.name);

        //alert(color);
        let color = type.color + " solid 3px";
        $(document).ready(function () {
          $("#about").css("border", color);

          
        });
      })
      this.service.find_fast_attack_for_pokemon(id).subscribe(data => {
        let attacks = JSON.parse(JSON.stringify(data));
        for (let a of attacks) {
          this.service.find_fast_attack_by_id(a.idAttack).subscribe(data => {
            this.quick_attacks.push(JSON.parse(JSON.stringify(data)));
            //alert(this.quick_attacks);
          })
        }
      })
      this.service.find_main_attack_for_pokemon(id).subscribe(data => {
        let attacks = JSON.parse(JSON.stringify(data));
        for (let a of attacks) {
          this.service.find_main_attack_by_id(a.idAttack).subscribe(data => {
            this.main_attacks.push(JSON.parse(JSON.stringify(data)));
          })
        }
      })
      this.pokemon_evolution = new Array;
      this.service.find_pokemon_evolution_first_pokemon(id).subscribe(data => {
        let p = JSON.parse(JSON.stringify(data));
        if (p != "") {
          this.pokemon_evolution = p;
          this.prepare_evolution();
        } else {
          this.service.find_pokemon_evolution_second_pokemon(id).subscribe(data => {
            let p1 = JSON.parse(JSON.stringify(data));
            if (p1 != "") {
              this.service.find_pokemon_evolution_first_pokemon(p1[0].idPokemon).subscribe(data => {
                this.pokemon_evolution = JSON.parse(JSON.stringify(data));
                this.prepare_evolution();
              })
            } else {
              this.service.find_pokemon_evolution_third_pokemon(id).subscribe(data => {
                let p2 = JSON.parse(JSON.stringify(data));
                this.service.find_pokemon_evolution_first_pokemon(p2[0].idPokemon).subscribe(data => {
                  this.pokemon_evolution = JSON.parse(JSON.stringify(data));
                  this.prepare_evolution();
                })
              })
            }
          })
        }
      })
    })
  }

  prepare_evolution(): void {
    // alert(this.pokemon_evolution[0].idPokemon + " " + this.pokemon_evolution[0].idPokemon1 + " " +this.pokemon_evolution[0].idPokemon2);
    this.second = new Array;
    this.third = new Array;

    if (this.pokemon_evolution[0].idPokemon2 == 0 && this.pokemon_evolution[0].idPokemon1 == 0) {
      this.br_evolution = 1;
      return;
    }

    if (this.pokemon_evolution[0].idPokemon2 == 0) {
      this.br_evolution = 2;
    }
    else {
      this.br_evolution = 3;
    }

    this.first = this.pokemon_evolution[0].idPokemon;

    for (let e of this.pokemon_evolution) {
      let sec = false;
      let thi = false;

      for (let e1 of this.second) {
        if (e.idPokemon1 == e1) {
          sec = true;
          break;
        }
      }

      for (let e2 of this.third) {
        if (e.idPokemon2 == e2) {
          thi = true;
          break;
        }
      }

      if (sec == false) {
        this.second.push(e.idPokemon1);
      }

      if (thi == false) {
        this.third.push(e.idPokemon2);
      }


    }
  }
}
