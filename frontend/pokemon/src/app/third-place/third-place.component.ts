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
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

declare var $: any;
@Component({
  selector: 'app-third-place',
  templateUrl: './third-place.component.html',
  styleUrls: ['./third-place.component.css']
})
export class ThirdPlaceComponent implements OnInit {



  constructor(private router: ActivatedRoute, private router1: Router, private service: PokemonService) { }

  ngOnInit(): void {
    this.match_details = new Array;
    this.id = this.router.snapshot.params.id;
    this.num_of_match_finished = Number(localStorage.getItem("t" + this.id + "t-matches_finished"));
    //$('#progress_bar').width(Math.round(this.num_of_match_finished * 100 / 2) + "%").attr('aria-valuenow', this.num_of_match_finished);
    this.find_tournament_by_id(this.id);
  }

  id: Number;
  tour: Tournament;
  match_details: MatchDetails[];
  matches: Match[];
  num_of_match_finished: number;

  //napadi itd za mec
  match: Match;


  pok1: Pokemon;
  pok2: Pokemon;

  fast_attacks1: PokemonFastAttack[];
  fast_attacks2: PokemonFastAttack[];

  main_attacks1: PokemonMainAttack[];
  main_attacks2: PokemonMainAttack[];

  fast_attack1: FastAttack;
  fast_attack2: FastAttack;

  main_attack1: MainAttack;
  main_attack2: MainAttack;

  fast_attack1_percentage: number;
  fast_attack2_percentage: number;

  main_attack1_percentage: number;
  main_attack2_percentage: number;

  num: Number;

  fast_attack1_same_type: number;
  fast_attack2_same_type: number;
  main_attack1_same_type: number;
  main_attack2_same_type: number;

  //za mec

  energy1: number;
  energy2: number;
  hp_left1: number;
  hp_left2: number;
  sec_to_next_attack1: number;
  sec_to_next_attack2: number;

  next_attack_is_main1: Boolean;
  next_attack_is_main2: Boolean;


  hp_pok1: number;
  hp_pok2: number;

  //pocinje for petlja za borbu

  iterator1: number;
  iterator2: number;


  find_tournament_by_id(id: Number): void {
    this.service.find_tournament_by_id(id).subscribe(data => {
      this.tour = JSON.parse(JSON.stringify(data))[0];

      this.service.find_matches_by_type(id, "t").subscribe(data => {
        this.matches = new Array;
        let num_of_matches: number;

        this.matches = JSON.parse(JSON.stringify(data));
        num_of_matches = this.matches.length;
        //alert(num_of_matches);
        this.set_pokemon(0, this.matches[0], this.matches, this.matches.length);
      })
    })
  }

  set_pokemon(index: number, m: Match, more_matches: Match[], size: number) {
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
                if (m.idFastAttack1 == 0) {
                  md = {
                    'idPokemon1': m.idPokemon1, 'idPokemon2': m.idPokemon2, 'namePokemon1': pokemon1.name, 'namePokemon2': pokemon2.name,
                    'nameFastAttack1': "No Quick Attack Yet", 'idFastAttack1': 0, 'idFastAttack1Type': 0, 'nameMainAttack1': "No Main Attack Yet", 'idMainAttack1': 0, 'idMainAttack1Type': 0,
                    'nameFastAttack2': "No Quick Attack Yet", 'idFastAttack2': 0, 'idFastAttack2Type': 0, 'nameMainAttack2': "No Main Attack Yet", 'idMainAttack2': 0, 'idMainAttack2Type': 0,
                    'hp_left1': 100, 'hp_left2': 100, 'result': 3, 'idMatch': m.id, 'pokemon1type1': pokemon1.type1, 'pokemon1type2': pokemon1.type2, 'pokemon2type1': pokemon2.type1, 'pokemon2type2': pokemon2.type2
                  }
                } else {
                  md = {
                    'idPokemon1': pokemon1.id, 'idPokemon2': pokemon2.id, 'namePokemon1': pokemon1.name, 'namePokemon2': pokemon2.name,
                    'nameFastAttack1': fast_attacks1.name, 'idFastAttack1': fast_attacks1.id, 'idFastAttack1Type': fast_attacks1.type, 'nameMainAttack1': main_attacks1.name, 'idMainAttack1': main_attacks1.id, 'idMainAttack1Type': main_attacks1.type,
                    'nameFastAttack2': fast_attacks2.name, 'idFastAttack2': fast_attacks2.id, 'idFastAttack2Type': fast_attacks2.type, 'nameMainAttack2': main_attacks2.name, 'idMainAttack2': main_attacks2.id, 'idMainAttack2Type': main_attacks2.type,
                    'hp_left1': m.hp_left1 > 0 ? Math.round(m.hp_left1 * 100 / pokemon1.health) : 0, 'hp_left2': m.hp_left2 > 0 ? Math.round(m.hp_left2 * 100 / pokemon2.health) : 0, 'result': m.result, 'idMatch': m.id, 'pokemon1type1': pokemon1.type1, 'pokemon1type2': pokemon1.type2, 'pokemon2type1': pokemon2.type1, 'pokemon2type2': pokemon2.type2
                  }
                }
                if (index == 0) {
                  $('#progress_bar_match1_pok1').width(md.hp_left1 + "%").attr('aria-valuenow', this.num_of_match_finished);
                  $('#progress_bar_match1_pok2').width(md.hp_left2 + "%").attr('aria-valuenow', this.num_of_match_finished);
                } 

                if (index == 0 && m.result != 3) {
                  if (md.hp_left1 >= md.hp_left2) {
                    $('#progress_bar_match1_pok1').css("background-color", "green");
                    $('#progress_bar_match1_pok2').css("background-color", "red");
                  } else {
                    $('#progress_bar_match1_pok2').css("background-color", "green");
                    $('#progress_bar_match1_pok1').css("background-color", "red");
                  }
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
                if (num <= size) {
                  this.set_pokemon(num, more_matches[num], more_matches, size);
                }
              })
            })
          })
        })
      })
    })
  }

  //mau <3

  next_stage(): void {
    
      if(this.matches[0].result==1){
      this.service.update_points_tournament(this.id, this.matches[0].idPokemon1, 15).subscribe(data=>{
        if (data['ok'] == 'no') {
          //alert("Something went wrong");
          return;
        }
        this.service.tournament_add_3_place(this.id, this.match_details[0].idPokemon1, this.match_details[0].namePokemon1).subscribe(data=>{
          alert(this.match_details[0].idPokemon1 + " " + this.match_details[0].namePokemon1);
          if (data['ok'] == 'no') {
            alert("Something went wrong");
            return;
          }
          this.service.update_points_tournament(this.id, this.matches[0].idPokemon2, 13).subscribe(data=>{
            if (data['ok'] == 'no') {
              //alert("Something went wrong");
              return;
            }
            this.service.tournament_add_4_place(this.id, this.match_details[0].idPokemon2, this.match_details[0].namePokemon2).subscribe(data=>{
              if (data['ok'] == 'no') {
                alert("Something went wrong");
                return;
              }
              this.router1.navigate(['/tournament_finals/' + this.id]);
            })
          })
        })
      })
    }
    else{
      this.service.update_points_tournament(this.id, this.matches[0].idPokemon2, 15).subscribe(data=>{
        if (data['ok'] == 'no') {
          alert("Something went wrong");
          return;
        }
        this.service.tournament_add_3_place(this.id, this.match_details[0].idPokemon2, this.match_details[0].namePokemon2).subscribe(data=>{
          alert(this.match_details[0].idPokemon1 + " " + this.match_details[0].namePokemon1);
          if (data['ok'] == 'no') {
            alert("Something went wrong");
            return;
          }
          this.service.update_points_tournament(this.id, this.matches[0].idPokemon1, 13).subscribe(data=>{
            if (data['ok'] == 'no') {
              alert("Something went wrong");
              return;
            }
            this.service.tournament_add_4_place(this.id, this.match_details[0].idPokemon1, this.match_details[0].namePokemon1).subscribe(data=>{
              if (data['ok'] == 'no') {
                alert("Something went wrong");
                return;
              }
              this.router1.navigate(['/tournament_finals/' + this.id]);
            })
          })
        })
      })
    }
    
  }

  add_new_match(index: number, matches_: Match[], pokemon: number[], size: number): void {
    let m: Match;
    m = matches_[index];
    if (m.result == 2) {
      pokemon.push(m.idPokemon2);
      this.service.update_points_tournament(this.id, m.idPokemon1, 10).subscribe(data => {
        if (data['ok'] == 'no') {
          alert("Something went wrong");
          return;
        }
        index++;
        if (index < size) {
          this.add_new_match(index, matches_, pokemon, size);
        }
        else {
          let number_of_matches: number;
          let num: number;


          number_of_matches = pokemon.length / 2;
          num = pokemon.length;
          //alert(number_of_matches);


          this.service.get_match_max_id().subscribe(data => {
            let mt_max_id = JSON.parse(JSON.stringify(data));

            let match_max_id: number;
            if (mt_max_id == "") {
              match_max_id = 1;
            }
            else {
              match_max_id = mt_max_id[0].id + 1;
            }

            for (let i = 0; i < number_of_matches; i++) {




              let p1: number;
              let p2: number;
              for (let j = 0; j < 2; j++) {
                let index = Math.floor(Math.random() * num);
                num--;
                if (j == 0) {
                  p1 = pokemon[index];
                } else {
                  p2 = pokemon[index];
                }
                pokemon.splice(index, 1);

              }




              let match_id = match_max_id++;
              this.service.add_new_match(match_id, 0, this.id, p1, p2, "s").subscribe(data => {
                if (data['ok'] == 'no') {
                  alert("Something went wrong");
                  return;
                }


                if (i == number_of_matches - 1) {
                  this.router1.navigate(['/tournament_semifinals/' + this.id]);
                }
              })

            }
          })
        }
      })
    } else {
      pokemon.push(m.idPokemon1);
      this.service.update_points_tournament(this.id, m.idPokemon2, 10).subscribe(data => {
        if (data['ok'] == 'no') {
          alert("Something went wrong");
          return;
        }
        index++;
        if (index < size) {
          this.add_new_match(index, matches_, pokemon, size);
        }
        else {
          let number_of_matches: number;
          let num: number;


          number_of_matches = pokemon.length / 2;
          num = pokemon.length;
          //alert(number_of_matches);


          this.service.get_match_max_id().subscribe(data => {
            let mt_max_id = JSON.parse(JSON.stringify(data));

            let match_max_id: number;
            if (mt_max_id == "") {
              match_max_id = 1;
            }
            else {
              match_max_id = mt_max_id[0].id + 1;
            }

            for (let i = 0; i < number_of_matches; i++) {




              let p1: number;
              let p2: number;
              for (let j = 0; j < 2; j++) {
                let index = Math.floor(Math.random() * num);
                num--;
                if (j == 0) {
                  p1 = pokemon[index];
                } else {
                  p2 = pokemon[index];
                }
                pokemon.splice(index, 1);

              }




              let match_id = match_max_id++;
              this.service.add_new_match(match_id, 0, this.id, p1, p2, "s").subscribe(data => {
                if (data['ok'] == 'no') {
                  alert("Something went wrong");
                  return;
                }


                if (i == number_of_matches - 1) {
                  this.router1.navigate(['/tournament_semifinals/' + this.id]);
                }
              })

            }
          })
        }
      })
    }

  }

  sub: any;

  one_second_of_match(i: number) {
    if (this.hp_left1 > 0 && this.hp_left2 > 0) {

      this.iterator1++;
      this.iterator2++;
      //za prvog
      if (this.iterator1 >= this.sec_to_next_attack1) {
        this.iterator1 = 0;
        if (this.next_attack_is_main1) {
          this.next_attack_is_main1 = false;
          this.energy1 = this.energy1 - this.main_attack1.energy;
          this.sec_to_next_attack1 = this.fast_attack1.duration / 100;
          if (this.main_attack1_same_type == 1) {
            this.hp_left2 = this.hp_left2 - this.main_attack1.damage * this.main_attack1_percentage * 1.2 / 100;
          } else {
            this.hp_left2 = this.hp_left2 - this.main_attack1.damage * this.main_attack1_percentage / 100;
          }

        } else {
          this.energy1 = this.energy1 + this.fast_attack1.energy;
          if (this.energy1 >= this.main_attack1.energy) {
            this.next_attack_is_main1 = true;
            this.sec_to_next_attack1 = this.main_attack1.duration / 100;
          }
          else {
            this.sec_to_next_attack1 = this.fast_attack1.duration / 100;
          }
          if (this.fast_attack1_same_type == 1) {
            this.hp_left2 = this.hp_left2 - this.fast_attack1.damage * this.fast_attack1_percentage * 1.2 / 100;
          }
          else {
            this.hp_left2 = this.hp_left2 - this.fast_attack1.damage * this.fast_attack1_percentage / 100;
          }

        }
      }
      //drugi igrac
      if (this.iterator2 >= this.sec_to_next_attack2) {
        this.iterator2 = 0;
        if (this.next_attack_is_main2) {
          this.next_attack_is_main2 = false;
          this.energy2 = this.energy2 - this.main_attack2.energy;
          this.sec_to_next_attack2 = this.fast_attack2.duration / 100;
          if (this.main_attack2_same_type == 1) {
            this.hp_left1 = this.hp_left1 - this.main_attack2.damage * this.main_attack2_percentage * 1.2 / 100;
          }
          else {
            this.hp_left1 = this.hp_left1 - this.main_attack2.damage * this.main_attack2_percentage / 100;
          }

        } else {
          this.energy2 = this.energy2 + this.fast_attack2.energy;
          if (this.energy2 >= this.main_attack2.energy) {
            this.next_attack_is_main2 = true;
            this.sec_to_next_attack2 = this.main_attack2.duration / 100;
          }
          else {
            this.sec_to_next_attack2 = this.fast_attack2.duration / 100;
          }
          if (this.fast_attack2_same_type == 1) {
            this.hp_left1 = this.hp_left1 - this.fast_attack2.damage * this.fast_attack2_percentage * 1.2 / 100;
          } else {
            this.hp_left1 = this.hp_left1 - this.fast_attack2.damage * this.fast_attack2_percentage / 100;
          }

        }
      }
      if (this.hp_left1 > 0) {
        this.match_details[i].hp_left1 = Math.round((100 * this.hp_left1 / this.hp_pok1));
      }
      else {
        this.match_details[i].hp_left1 = 0;

      }
      if (this.hp_left2 > 0) {
        this.match_details[i].hp_left2 = Math.round((100 * this.hp_left2 / this.hp_pok2));
      }
      else {
        this.match_details[i].hp_left2 = 0;

      }

      if (this.hp_left1 > 0) {
        if (i == 0) {
          $('#progress_bar_match1_pok1').width(Math.round((100 * this.hp_left1 / this.hp_pok1)) + "%").attr('aria-valuenow', this.num_of_match_finished);
        }
        

      }
      else {
        if (i == 0) {
          $('#progress_bar_match1_pok1').width(0 + "%").attr('aria-valuenow', this.num_of_match_finished);

        }
        

      }
      if (this.hp_left2 > 0) {
        if (i == 0) {
          $('#progress_bar_match1_pok2').width(Math.round((100 * this.hp_left2 / this.hp_pok2)) + "%").attr('aria-valuenow', this.num_of_match_finished);
        }
        

      }
      else {
        if (i == 0) {
          $('#progress_bar_match1_pok2').width(0 + "%").attr('aria-valuenow', this.num_of_match_finished);
        }
        


      }

      if (i == 0) {
        if (Math.round((100 * this.hp_left1 / this.hp_pok1)) >= Math.round((100 * this.hp_left2 / this.hp_pok2))) {
          $('#progress_bar_match1_pok1').css("background-color", "green");
          $('#progress_bar_match1_pok2').css("background-color", "red");
        } else {
          $('#progress_bar_match1_pok2').css("background-color", "green");
          $('#progress_bar_match1_pok1').css("background-color", "red");
        }
      }
     
    } else {
      this.sub.unsubscribe();
      let res: number;
      if (this.hp_left1 >= this.hp_left2) {
        res = 1;
      }
      else {
        res = 2;
      }

      this.match_details[i].result = res;
      this.matches[i].result = res;


      this.service.update_match(this.match.id, Math.round(this.hp_left1), Math.round(this.hp_left2), res, this.fast_attack1.id, this.fast_attack2.id, this.main_attack1.id, this.main_attack2.id).subscribe(data => {
        if (data['ok'] == 'no') {
          alert("Something went wrong");
          return;
        }
        this.num_of_match_finished++;
        localStorage.setItem("t" + this.id + "t-matches_finished", String(this.num_of_match_finished));

      })
    }
  }

  run_match(i: number): void {

    this.match = this.matches[i];

    $("#match_one").prop("disabled", true);

    this.service.find_pokemon_by_id(this.match.idPokemon1).subscribe(data => {
      this.pok1 = JSON.parse(JSON.stringify(data));
      this.service.find_fast_attack_for_pokemon(this.match.idPokemon1).subscribe(data => {
        this.fast_attacks1 = JSON.parse(JSON.stringify(data));
        let fast_attack: PokemonFastAttack;
        this.num = Math.floor(Math.random() * this.fast_attacks1.length);
        fast_attack = this.fast_attacks1[String(this.num)];
        this.fast_attack1_same_type = fast_attack.isSameType;
        //alert(fast_attack1);
        //localStorage.setItem("fast_attack", JSON.stringify(fast_attack1));
        this.service.find_fast_attack_by_id(fast_attack.idAttack).subscribe(data => {
          this.fast_attack1 = JSON.parse(JSON.stringify(data));

          this.service.find_pokemon_details_by_pokemon_and_type(this.match.idPokemon2, this.fast_attack1.type).subscribe(data => {
            let detail: PokemonDetails;
            detail = JSON.parse(JSON.stringify(data));

            this.fast_attack1_percentage = detail.damagePercentage;
            this.service.find_main_attack_for_pokemon(this.match.idPokemon1).subscribe(data => {
              this.main_attacks1 = JSON.parse(JSON.stringify(data));
              let main_attack: PokemonMainAttack;
              this.num = Math.floor(Math.random() * this.main_attacks1.length);
              main_attack = this.main_attacks1[String(this.num)];
              this.main_attack1_same_type = main_attack.isSameType;
              this.service.find_main_attack_by_id(main_attack.idAttack).subscribe(data => {
                this.main_attack1 = JSON.parse(JSON.stringify(data));

                this.service.find_pokemon_details_by_pokemon_and_type(this.match.idPokemon2, this.main_attack1.type).subscribe(data => {
                  let detail: PokemonDetails;
                  detail = JSON.parse(JSON.stringify(data));

                  this.main_attack1_percentage = detail.damagePercentage;
                  //ovde pocinje za drugog
                  this.service.find_pokemon_by_id(this.match.idPokemon2).subscribe(data => {
                    this.pok2 = JSON.parse(JSON.stringify(data));
                    this.service.find_fast_attack_for_pokemon(this.match.idPokemon2).subscribe(data => {
                      this.fast_attacks2 = JSON.parse(JSON.stringify(data));

                      let fast_attack: PokemonFastAttack;
                      this.num = Math.floor(Math.random() * this.fast_attacks2.length);
                      fast_attack = this.fast_attacks2[String(this.num)];
                      this.fast_attack2_same_type = fast_attack.isSameType;

                      this.service.find_fast_attack_by_id(fast_attack.idAttack).subscribe(data => {
                        this.fast_attack2 = JSON.parse(JSON.stringify(data));


                        this.service.find_pokemon_details_by_pokemon_and_type(this.match.idPokemon1, this.fast_attack2.type).subscribe(data => {
                          let detail: PokemonDetails;
                          detail = JSON.parse(JSON.stringify(data));

                          this.fast_attack2_percentage = detail.damagePercentage;
                          this.service.find_main_attack_for_pokemon(this.match.idPokemon2).subscribe(data => {
                            this.main_attacks2 = JSON.parse(JSON.stringify(data));

                            let main_attack: PokemonMainAttack;
                            this.num = Math.floor(Math.random() * this.main_attacks2.length);
                            main_attack = this.main_attacks2[String(this.num)];

                            this.main_attack2_same_type = main_attack.isSameType;
                            this.service.find_main_attack_by_id(main_attack.idAttack).subscribe(data => {
                              this.main_attack2 = JSON.parse(JSON.stringify(data));

                              this.service.find_pokemon_details_by_pokemon_and_type(this.match.idPokemon1, this.main_attack2.type).subscribe(data => {
                                let detail: PokemonDetails;
                                detail = JSON.parse(JSON.stringify(data));

                                this.main_attack2_percentage = detail.damagePercentage;

                                //game starts

                                //init
                                this.energy1 = this.energy2 = 0;
                                this.hp_left1 = this.pok1.health;
                                this.hp_left2 = this.pok2.health;

                                this.hp_pok1 = this.hp_left1;
                                this.hp_pok2 = this.hp_left2;
                                this.sec_to_next_attack1 = this.fast_attack1.duration / 100;
                                this.sec_to_next_attack2 = this.fast_attack2.duration / 100;

                                this.next_attack_is_main1 = false;
                                this.next_attack_is_main2 = false;

                                //pocinje for petlja za borbu


                                this.iterator1 = 0;
                                this.iterator2 = 0;
                                this.match_details[i].idFastAttack1 = this.fast_attack1.id;
                                this.match_details[i].idFastAttack1Type = this.fast_attack1.type;
                                this.match_details[i].nameFastAttack1 = this.fast_attack1.name;
                                this.match_details[i].idMainAttack1 = this.main_attack1.id;
                                this.match_details[i].idMainAttack1Type = this.main_attack1.type;
                                this.match_details[i].nameMainAttack1 = this.main_attack1.name;

                                this.match_details[i].idFastAttack2 = this.fast_attack2.id;
                                this.match_details[i].idFastAttack2Type = this.fast_attack2.type;
                                this.match_details[i].nameFastAttack2 = this.fast_attack2.name;
                                this.match_details[i].idMainAttack2 = this.main_attack2.id;
                                this.match_details[i].idMainAttack2Type = this.main_attack2.type;
                                this.match_details[i].nameMainAttack2 = this.main_attack2.name;

                                this.sub = interval(100).subscribe(x => {
                                  this.one_second_of_match(i);
                                });
                                //kraj meca i azuriranje podataka

                              })
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  }
}
