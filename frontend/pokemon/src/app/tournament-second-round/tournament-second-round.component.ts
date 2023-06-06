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


declare var $: any;
@Component({
  selector: 'app-tournament-second-round',
  templateUrl: './tournament-second-round.component.html',
  styleUrls: ['./tournament-second-round.component.css']
})
export class TournamentSecondRoundComponent implements OnInit {

  constructor(private router: ActivatedRoute, private router1: Router, private service: PokemonService) { }

  ngOnInit(): void {
    this.match_details = new Array;
    this.id = this.router.snapshot.params.id;
    this.num_of_match_finished = Number(localStorage.getItem("t"+this.id+"r2-matches_finished"));
    $('#progress_bar').width(Math.round(this.num_of_match_finished * 100 / 16) + "%").attr('aria-valuenow', this.num_of_match_finished);
    this.find_tournament_by_id(this.id);
  }

  id: Number;
  tour: Tournament;
  match_details: MatchDetails[];
  matches: Match[];
  num_of_match_finished: number;

  find_tournament_by_id(id: Number): void {
    this.service.find_tournament_by_id(id).subscribe(data => {
      this.tour = JSON.parse(JSON.stringify(data))[0];

      this.service.find_matches_by_type(id, "r2").subscribe(data => {
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
                    'nameFastAttack1': "", 'idFastAttack1': 0, 'idFastAttack1Type': 0, 'nameMainAttack1': "", 'idMainAttack1': 0, 'idMainAttack1Type': 0,
                    'nameFastAttack2': "", 'idFastAttack2': 0, 'idFastAttack2Type': 0, 'nameMainAttack2': "", 'idMainAttack2': 0, 'idMainAttack2Type': 0,
                    'hp_left1': 100, 'hp_left2': 100, 'result': 3, 'idMatch': m.id
                  }
                } else {
                  md = {
                    'idPokemon1': pokemon1.id, 'idPokemon2': pokemon2.id, 'namePokemon1': pokemon1.name, 'namePokemon2': pokemon2.name,
                    'nameFastAttack1': fast_attacks1.name, 'idFastAttack1': fast_attacks1.id, 'idFastAttack1Type': fast_attacks1.type, 'nameMainAttack1': main_attacks1.name, 'idMainAttack1': main_attacks1.id, 'idMainAttack1Type': main_attacks1.type,
                    'nameFastAttack2': fast_attacks2.name, 'idFastAttack2': fast_attacks2.id, 'idFastAttack2Type': fast_attacks2.type, 'nameMainAttack2': main_attacks2.name, 'idMainAttack2': main_attacks2.id, 'idMainAttack2Type': main_attacks2.type,
                    'hp_left1': m.hp_left1 > 0 ? Math.round(m.hp_left1 * 100 / pokemon1.health) : 0, 'hp_left2': m.hp_left2 > 0 ? Math.round(m.hp_left2 * 100 / pokemon2.health) : 0, 'result': m.result, 'idMatch': m.id
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
    let pokemon: number[];
    pokemon = new Array;
    this.add_new_match(0, this.matches, pokemon, this.matches.length);
  }

  add_new_match(index: number, matches_: Match[], pokemon: number[], size: number): void {
    let m: Match;
    m = matches_[index];
    if (m.result == 2) {
      pokemon.push(m.idPokemon2);
      this.service.update_points_tournament(this.id, m.idPokemon1, 5).subscribe(data => {
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
              this.service.add_new_match(match_id, 0, this.id, p1, p2, "r3").subscribe(data => {
                if (data['ok'] == 'no') {
                  alert("Something went wrong");
                  return;
                }


                if (i == number_of_matches - 1) {
                  this.router1.navigate(['/tournament_third_round/' + this.id]);
                }
              })

            }
          })
        }
      })
    } else {
      pokemon.push(m.idPokemon1);
      this.service.update_points_tournament(this.id, m.idPokemon2, 5).subscribe(data => {
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
              this.service.add_new_match(match_id, 0, this.id, p1, p2, "r3").subscribe(data => {
                if (data['ok'] == 'no') {
                  alert("Something went wrong");
                  return;
                }


                if (i == number_of_matches - 1) {
                  this.router1.navigate(['/tournament_third_round/' + this.id]);
                }
              })

            }
          })
        }
      })
    }

  }

  run_all_matches(): void {
    for (let index in this.matches) {
      if (this.matches[index].result == 3) {
        this.run_match(Number(index));
      }
    }
  }
  run_match(i: number): void {
    let match: Match;
    match = this.matches[i];

    let pok1: Pokemon;
    let pok2: Pokemon;

    let fast_attacks1: PokemonFastAttack[];
    let fast_attacks2: PokemonFastAttack[];

    let main_attacks1: PokemonMainAttack[];
    let main_attacks2: PokemonMainAttack[];

    let fast_attack1: FastAttack;
    let fast_attack2: FastAttack;

    let main_attack1: MainAttack;
    let main_attack2: MainAttack;

    let fast_attack1_percentage: number;
    let fast_attack2_percentage: number;

    let main_attack1_percentage: number;
    let main_attack2_percentage: number;

    let num: Number;

    let fast_attack1_same_type: number;
    let fast_attack2_same_type: number;
    let main_attack1_same_type: number;
    let main_attack2_same_type: number;

    this.service.find_pokemon_by_id(match.idPokemon1).subscribe(data => {
      pok1 = JSON.parse(JSON.stringify(data));
      this.service.find_fast_attack_for_pokemon(match.idPokemon1).subscribe(data => {
        fast_attacks1 = JSON.parse(JSON.stringify(data));
        let fast_attack: PokemonFastAttack;
        num = Math.floor(Math.random() * fast_attacks1.length);
        fast_attack = fast_attacks1[String(num)];
        fast_attack1_same_type = fast_attack.isSameType;
        //alert(fast_attack1);
        //localStorage.setItem("fast_attack", JSON.stringify(fast_attack1));
        this.service.find_fast_attack_by_id(fast_attack.idAttack).subscribe(data => {
          fast_attack1 = JSON.parse(JSON.stringify(data));

          this.service.find_pokemon_details_by_pokemon_and_type(match.idPokemon2, fast_attack1.type).subscribe(data => {
            let detail: PokemonDetails;
            detail = JSON.parse(JSON.stringify(data));

            fast_attack1_percentage = detail.damagePercentage;
            this.service.find_main_attack_for_pokemon(match.idPokemon1).subscribe(data => {
              main_attacks1 = JSON.parse(JSON.stringify(data));
              let main_attack: PokemonMainAttack;
              num = Math.floor(Math.random() * main_attacks1.length);
              main_attack = main_attacks1[String(num)];
              main_attack1_same_type = main_attack.isSameType;
              this.service.find_main_attack_by_id(main_attack.idAttack).subscribe(data => {
                main_attack1 = JSON.parse(JSON.stringify(data));

                this.service.find_pokemon_details_by_pokemon_and_type(match.idPokemon2, main_attack1.type).subscribe(data => {
                  let detail: PokemonDetails;
                  detail = JSON.parse(JSON.stringify(data));

                  main_attack1_percentage = detail.damagePercentage;
                  //ovde pocinje za drugog
                  this.service.find_pokemon_by_id(match.idPokemon2).subscribe(data => {
                    pok2 = JSON.parse(JSON.stringify(data));
                    this.service.find_fast_attack_for_pokemon(match.idPokemon2).subscribe(data => {
                      fast_attacks2 = JSON.parse(JSON.stringify(data));

                      let fast_attack: PokemonFastAttack;
                      num = Math.floor(Math.random() * fast_attacks2.length);
                      fast_attack = fast_attacks2[String(num)];
                      fast_attack2_same_type = fast_attack.isSameType;

                      this.service.find_fast_attack_by_id(fast_attack.idAttack).subscribe(data => {
                        fast_attack2 = JSON.parse(JSON.stringify(data));


                        this.service.find_pokemon_details_by_pokemon_and_type(match.idPokemon1, fast_attack2.type).subscribe(data => {
                          let detail: PokemonDetails;
                          detail = JSON.parse(JSON.stringify(data));

                          fast_attack2_percentage = detail.damagePercentage;
                          this.service.find_main_attack_for_pokemon(match.idPokemon2).subscribe(data => {
                            main_attacks2 = JSON.parse(JSON.stringify(data));

                            let main_attack: PokemonMainAttack;
                            num = Math.floor(Math.random() * main_attacks2.length);
                            main_attack = main_attacks2[String(num)];

                            main_attack2_same_type = main_attack.isSameType;
                            this.service.find_main_attack_by_id(main_attack.idAttack).subscribe(data => {
                              main_attack2 = JSON.parse(JSON.stringify(data));

                              this.service.find_pokemon_details_by_pokemon_and_type(match.idPokemon1, main_attack2.type).subscribe(data => {
                                let detail: PokemonDetails;
                                detail = JSON.parse(JSON.stringify(data));

                                main_attack2_percentage = detail.damagePercentage;

                                //game starts
                                let energy1: number;
                                let energy2: number;
                                let hp_left1: number;
                                let hp_left2: number;
                                let sec_to_next_attack1: number;
                                let sec_to_next_attack2: number;

                                let next_attack_is_main1: Boolean;
                                let next_attack_is_main2: Boolean;


                                let hp_pok1: number;
                                let hp_pok2: number;
                                //init
                                energy1 = energy2 = 0;
                                hp_left1 = pok1.health;
                                hp_left2 = pok2.health;

                                hp_pok1 = hp_left1;
                                hp_pok2 = hp_left2;
                                sec_to_next_attack1 = fast_attack1.duration / 100;
                                sec_to_next_attack2 = fast_attack2.duration / 100;

                                next_attack_is_main1 = false;
                                next_attack_is_main2 = false;

                                //pocinje for petlja za borbu

                                let iterator1: number;
                                let iterator2: number;
                                iterator1 = 0;
                                iterator2 = 0;
                                // alert("do ovde");
                                //alert("prvi: " + pok1.name + " -> " + "hp: " + hp_left1 + ", fast_attack(damage/energy/sec): (" + fast_attack1.damage + "/" + fast_attack1.energy + "/" + fast_attack1.duration + "), main_attack(damage/energy/sec): (" + main_attack1.damage + "/" + main_attack1.energy + "/" + main_attack1.duration + "), sameType(1-YES, 0-NO): " + fast_attack1_same_type);
                                //alert("drugi: " + pok2.name + " -> " + "hp: " + hp_left2 + ", fast_attack(damage/energy/sec): (" + fast_attack2.damage + "/" + fast_attack2.energy + "/" + fast_attack2.duration + "), main_attack(damage/energy/sec): (" + main_attack2.damage + "/" + main_attack2.energy + "/" + main_attack2.duration + "), sameType(1-YES, 0-NO): " + fast_attack2_same_type);
                                //alert('fast_attack2')
                                while (hp_left1 > 0 && hp_left2 > 0) {

                                  iterator1++;
                                  iterator2++;
                                  //za prvog
                                  if (iterator1 >= sec_to_next_attack1) {
                                    iterator1 = 0;
                                    if (next_attack_is_main1) {
                                      next_attack_is_main1 = false;
                                      energy1 = energy1 - main_attack1.energy;
                                      sec_to_next_attack1 = fast_attack1.duration / 100;
                                      if (main_attack1_same_type == 1) {
                                        hp_left2 = hp_left2 - main_attack1.damage * main_attack1_percentage * 1.2 / 100;
                                      } else {
                                        hp_left2 = hp_left2 - main_attack1.damage * main_attack1_percentage / 100;
                                      }

                                    } else {
                                      energy1 = energy1 + fast_attack1.energy;
                                      if (energy1 >= main_attack1.energy) {
                                        next_attack_is_main1 = true;
                                        sec_to_next_attack1 = main_attack1.duration / 100;
                                      }
                                      else {
                                        sec_to_next_attack1 = fast_attack1.duration / 100;
                                      }
                                      if (fast_attack1_same_type == 1) {
                                        hp_left2 = hp_left2 - fast_attack1.damage * fast_attack1_percentage * 1.2 / 100;
                                      }
                                      else {
                                        hp_left2 = hp_left2 - fast_attack1.damage * fast_attack1_percentage / 100;
                                      }

                                    }
                                  }
                                  //drugi igrac
                                  if (iterator2 >= sec_to_next_attack2) {
                                    iterator2 = 0;
                                    if (next_attack_is_main2) {
                                      next_attack_is_main2 = false;
                                      energy2 = energy2 - main_attack2.energy;
                                      sec_to_next_attack2 = fast_attack2.duration / 100;
                                      if (main_attack2_same_type == 1) {
                                        hp_left1 = hp_left1 - main_attack2.damage * main_attack2_percentage * 1.2 / 100;
                                      }
                                      else {
                                        hp_left1 = hp_left1 - main_attack2.damage * main_attack2_percentage / 100;
                                      }

                                    } else {
                                      energy2 = energy2 + fast_attack2.energy;
                                      if (energy2 >= main_attack2.energy) {
                                        next_attack_is_main2 = true;
                                        sec_to_next_attack2 = main_attack2.duration / 100;
                                      }
                                      else {
                                        sec_to_next_attack2 = fast_attack2.duration / 100;
                                      }
                                      if (fast_attack2_same_type == 1) {
                                        hp_left1 = hp_left1 - fast_attack2.damage * fast_attack2_percentage * 1.2 / 100;
                                      } else {
                                        hp_left1 = hp_left1 - fast_attack2.damage * fast_attack2_percentage / 100;
                                      }

                                    }
                                  }
                                }
                                //kraj meca i azuriranje podataka
                                let res: number;
                                if (hp_left1 >= hp_left2) {
                                  res = 1;
                                }
                                else {
                                  res = 2;
                                }

                                this.match_details[i].result = res;
                                this.match_details[i].idFastAttack1 = fast_attack1.id;
                                this.match_details[i].idFastAttack1Type = fast_attack1.type;
                                this.match_details[i].nameFastAttack1 = fast_attack1.name;
                                this.match_details[i].idMainAttack1 = main_attack1.id;
                                this.match_details[i].idMainAttack1Type = main_attack1.type;
                                this.match_details[i].nameMainAttack1 = main_attack1.name;

                                this.match_details[i].idFastAttack2 = fast_attack2.id;
                                this.match_details[i].idFastAttack2Type = fast_attack2.type;
                                this.match_details[i].nameFastAttack2 = fast_attack2.name;
                                this.match_details[i].idMainAttack2 = main_attack2.id;
                                this.match_details[i].idMainAttack2Type = main_attack2.type;
                                this.match_details[i].nameMainAttack2 = main_attack2.name;
                                if (hp_left1 > 0) {
                                  this.match_details[i].hp_left1 = Math.round((100 * hp_left1 / hp_pok1));
                                }
                                else {
                                  this.match_details[i].hp_left1 = 0;

                                }
                                if (hp_left2 > 0) {
                                  this.match_details[i].hp_left2 = Math.round((100 * hp_left2 / hp_pok2));
                                }
                                else {
                                  this.match_details[i].hp_left2 = 0;

                                }
                                this.matches[i].result = res;
                                this.service.update_match(match.id, Math.round(hp_left1), Math.round(hp_left2), res, fast_attack1.id, fast_attack2.id, main_attack1.id, main_attack2.id).subscribe(data => {
                                  if (data['ok'] == 'no') {
                                    alert("Something went wrong");
                                    return;
                                  }
                                  this.num_of_match_finished++;
                                  localStorage.setItem("t"+this.id+"r1-matches_finished", String(this.num_of_match_finished));
                                  $('#progress_bar').width(Math.round(this.num_of_match_finished * 100 / 16) + "%").attr('aria-valuenow', this.num_of_match_finished);
                                  $(document).ready(function () {
                                    //alert(indexInGroup);
                                    
                                   
                                    $("button." + i).prop("disabled", true);
                                    if (res == 1) {
                                      $("#" + pok1.name).css("color", "green");
                                      $("#" + pok2.name).css("color", "red");
                                    }
                                    else {
                                      $("#" + pok2.name).css("color", "green");
                                      $("#" + pok1.name).css("color", "red");
                                    }

                                  });
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
    })
  }
}
