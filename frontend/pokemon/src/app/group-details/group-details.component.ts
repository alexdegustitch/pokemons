import { Component, OnInit } from '@angular/core';

import { PokemonService } from '../pokemon.service';
import { Type } from '../models/type.model';
import { FastAttack } from '../models/fastAttack.model';
import { MainAttack } from '../models/mainAttack';
import { Pokemon } from '../models/pokemon.model';
import { ActivatedRoute } from '@angular/router';
import { PokemonEvolution } from '../models/pokemonEvolution.model';
import { Tournament } from '../models/tournaments.model';
import { Group } from '../models/group.model';
import { PokemonGroup } from '../models/pokemonGroup.model';
import { Match } from '../models/match.model';
import { PokemonDetails } from '../models/pokemonDetails';
import { PokemonFastAttack } from '../models/pokemonFastAttack.model';
import { PokemonMainAttack } from '../models/pokemonMainAttack.model';
import { Router } from '@angular/router';
import { MatchDetails } from '../models/match_details';
import {Location} from '@angular/common';

declare var $: any;
@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {

  constructor(private router: ActivatedRoute, private router1: Router, private service: PokemonService) { }

  ngOnInit(): void {
    this.pokemon_group = new Array;
    this.match_details = new Array;

    /*this.main_attacks1 = new Array;
    this.fast_attacks1 = new Array;
    this.matches = new Array;
    this.pokemon1 = new Array;
    this.main_attacks2 = new Array;
    this.fast_attacks2 = new Array;
    this.pokemon2 = new Array;*/

    this.id = this.router.snapshot.params.id;
    this.get_pokemon_group();
  }

  pokemon_group: PokemonGroup[];
  matches: Match[];
  id: Number;
  pokemon1: Pokemon;
  fast_attacks1: FastAttack;
  main_attacks1: MainAttack;
  pokemon2: Pokemon;
  fast_attacks2: FastAttack;
  main_attacks2: MainAttack;
  match_details: MatchDetails[];
  group: Group;

  

  get_pokemon_group(): void {

    this.service.find_group(this.id).subscribe(data => {
      this.group = JSON.parse(JSON.stringify(data));

      this.service.find_pokemon_for_group(this.id).subscribe(data => {
        this.pokemon_group = JSON.parse(JSON.stringify(data));
        this.service.find_matches_for_group(this.id).subscribe(data => {
          this.matches = JSON.parse(JSON.stringify(data));
          this.set_pokemon(0, this.matches[0], this.matches, this.matches.length);
        })
      })
    })
  }

  set_pokemon(index: number, m: Match, more_matches: Match[], size: number){
    this.service.find_fast_attack_by_id(m.idFastAttack1).subscribe(data => {
      let fast_attacks1: FastAttack;
      fast_attacks1 = JSON.parse(JSON.stringify(data));
      this.service.find_fast_attack_by_id(m.idFastAttack2).subscribe(data => {
        let fast_attacks2: FastAttack;
        fast_attacks2 = JSON.parse(JSON.stringify(data));
        this.service.find_main_attack_by_id(m.idMainAttack1).subscribe(data => {
          let main_attacks1: MainAttack;
          main_attacks1 = JSON.parse(JSON.stringify(data));
          this.service.find_main_attack_by_id(m.idMainAttack2).subscribe(data => {
            let main_attacks2: MainAttack
            main_attacks2 = JSON.parse(JSON.stringify(data));
            this.service.find_pokemon_by_id(m.idPokemon1).subscribe(data => {
              let pokemon1: Pokemon 
              pokemon1 = JSON.parse(JSON.stringify(data));
              //alert(this.pokemon1);
              this.service.find_pokemon_by_id(m.idPokemon2).subscribe(data => {
                let pokemon2: Pokemon
                pokemon2 = JSON.parse(JSON.stringify(data));
                let md: MatchDetails;
                md = {'idPokemon1': pokemon1.id, 'idPokemon2': pokemon2.id, 'namePokemon1': pokemon1.name, 'namePokemon2': pokemon2.name,
                        'nameFastAttack1': fast_attacks1.name, 'idFastAttack1': fast_attacks1.id, 'idFastAttack1Type': fast_attacks1.type, 'nameMainAttack1': main_attacks1.name, 'idMainAttack1': main_attacks1.id, 'idMainAttack1Type': main_attacks1.type,
                        'nameFastAttack2': fast_attacks2.name, 'idFastAttack2': fast_attacks2.id, 'idFastAttack2Type': fast_attacks2.type, 'nameMainAttack2': main_attacks2.name, 'idMainAttack2': main_attacks2.id, 'idMainAttack2Type': main_attacks2.type,
                        'hp_left1': m.hp_left1, 'hp_left2': m.hp_left2
                      }
                //alert(this.pokemon1.id + " " + this.pokemon1);
                /*localStorage.setItem("Pok", JSON.stringify(pokemon1));
                md.idPokemon1 = pokemon1.id;
                md.idPokemon2 = pokemon2.id;
                md.namePokemon1 = pokemon1.name;
                md.namePokemon2 = pokemon2.name;
                md.nameFastAttack1 = fast_attacks1.name;
                md.idFastAttack1 = fast_attacks1.id;
                md.idFastAttack1Type = fast_attacks1.type;
                md.nameMainAttack1 = main_attacks1.name;
                md.idMainAttack1 = main_attacks1.id;
                md.idMainAttack1Type = main_attacks1.type;
                md.hp_left1 = m.hp_left1;

                md.nameFastAttack2 = fast_attacks2.name;
                md.idFastAttack2 = fast_attacks2.id;
                md.idFastAttack2Type = fast_attacks2.type;
                md.nameMainAttack2 = main_attacks2.name;
                md.idMainAttack2 = main_attacks2.id;
                md.idMainAttack2Type = main_attacks2.type;
                md.hp_left2 = m.hp_left2;*/
                this.match_details.push(md);
                
                let num: number;
                num = index;
                num++;
                if(num <= size){
                  this.set_pokemon(num, more_matches[num], more_matches, size);
                }
              })
            })
          })
        })
      })
    })
  }
}
