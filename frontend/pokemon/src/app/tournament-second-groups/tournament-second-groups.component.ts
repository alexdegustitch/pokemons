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

declare var $: any;

@Component({
  selector: 'app-tournament-second-groups',
  templateUrl: './tournament-second-groups.component.html',
  styleUrls: ['./tournament-second-groups.component.css']
})
export class TournamentSecondGroupsComponent implements OnInit {

  constructor(private router: ActivatedRoute, private router1: Router, private service: PokemonService) { }

  ngOnInit(): void {
    this.num_of_match_finished = 0;
    this.id = this.router.snapshot.params.id;
    this.num_of_match_finished = Number(localStorage.getItem("t" + this.id + "g2-matches_finished"));
    $('#progress_bar').width(Math.round(this.num_of_match_finished * 100 / 448) + "%").attr('aria-valuenow', this.num_of_match_finished);
    this.find_tournament_by_id(this.id);

    
  }

  num_of_groups: Number;
  tour: Tournament;
  groups: Group[];
  pokemon_groups: PokemonGroup[];
  id: Number;

  num_group_finished: number;

  num_of_match_finished: number;

  find_tournament_by_id(id: Number): void {
    this.service.find_tournament_by_id(id).subscribe(data => {
      this.tour = JSON.parse(JSON.stringify(data))[0];
      //alert(this.tour + " " + this.id);

      this.groups = new Array;
      this.pokemon_groups = new Array;
      this.service.find_groups_for_tournament(id, 1).subscribe(data => {
        this.groups = JSON.parse(JSON.stringify(data));
        //alert(this.groups);
        this.num_of_groups = this.groups.length;
        for (let index in this.groups) {
          this.service.find_pokemon_for_group(this.groups[index].id).subscribe(data => {
            let pok_group: PokemonGroup;
            pok_group = JSON.parse(JSON.stringify(data));
            this.pokemon_groups[index] = pok_group;
            //localStorage.setItem("pokemon_group", JSON.stringify(this.pokemon_groups));
            //alert(this.pokemon_groups);

          })
        }

      })
      //alert(this.pokemon_groups);
    })
  }

  run_matches(idGroup: Number): void {
    //alert(idGroup);
    let pok_group: PokemonGroup;
    pok_group = this.pokemon_groups[String(idGroup)];
    let matches: Match[];
    matches = new Array;
    let num_of_done: number;
    num_of_done = 0;
    this.service.find_matches_for_group(pok_group[0].idGroup).subscribe(data => {
      alert(pok_group[0].idGroup);
      matches = JSON.parse(JSON.stringify(data));
      this.play_match(matches[0], 0, matches.length, matches, String(idGroup));
    })
  }

  play_match(match: Match, index: number, size: number, matches: Match[], indexInGroup: string): void {
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
    //localStorage.setItem("match", JSON.stringify(match));
    this.service.find_pokemon_by_id(match.idPokemon1).subscribe(data => {
      pok1 = JSON.parse(JSON.stringify(data));
      // localStorage.setItem("pok1", JSON.stringify(pok1));
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

                                //alert("hp 1:" + hp_left1 + ", hp 2: " + hp_left2);
                                //alert(match.id + " " + Math.round(hp_left1) + " " + Math.round(hp_left2) + " " + res)
                                this.service.update_match(match.id, Math.round(hp_left1), Math.round(hp_left2), res, fast_attack1.id, fast_attack2.id, main_attack1.id, main_attack2.id).subscribe(data => {
                                  if (data['ok'] == 'no') {
                                    alert("Something went wrong");
                                    return;
                                  }
                                  this.num_of_match_finished++;
                                  /*if(Math.round(this.num_of_match_finished*100/480) > 1){
                                  alert(Math.round(this.num_of_match_finished*100/480));
                                  }*/
                                  localStorage.setItem("t"+this.id+"g2-matches_finished", String(this.num_of_match_finished));
                                  $('#progress_bar').width(Math.round(this.num_of_match_finished * 100 / 448) + "%").attr('aria-valuenow', this.num_of_match_finished);
                                  this.service.find_pokemon_group(pok1.id, match.idGroup).subscribe(data => {
                                    let pok_g: PokemonGroup;
                                    pok_g = JSON.parse(JSON.stringify(data));

                                    //localStorage.setItem("pok_group" + match.id, JSON.stringify(pok_g));
                                    let points: number;
                                    let hp_left: number;

                                    // alert(pok_g + " " + pok1.id  + " "  +match.idGroup);
                                    points = pok_g.points;
                                    hp_left = pok_g.hp_left;

                                    if (res == 1) {
                                      points += 1;
                                      if (hp_left1 > 0) {
                                        hp_left += (100 * hp_left1 / hp_pok1);
                                      }
                                      //Najsladji sam i ti to znas :*
                                    }
                                    //alert("Pokemon " + pok_g.namePokemon + ": " + points);
                                    this.service.update_pokemon_group(pok1.id, match.idGroup, points, Math.round(hp_left)).subscribe(data => {
                                      if (data['ok'] == 'no') {
                                        alert("Something went wrong");
                                        return;
                                      }
                                      //update za drugog pokemona
                                      this.service.find_pokemon_group(pok2.id, match.idGroup).subscribe(data => {
                                        let pok_g: PokemonGroup;
                                        pok_g = JSON.parse(JSON.stringify(data));

                                        let points: number;
                                        let hp_left: number;

                                        points = pok_g.points;
                                        hp_left = pok_g.hp_left;

                                        if (res == 2) {
                                          points += 1;
                                          if (hp_left2 > 0) {
                                            hp_left += (100 * hp_left2 / hp_pok2);
                                          }
                                        }
                                        //alert("Pokemon " + pok_g.namePokemon + ": " + points);
                                        this.service.update_pokemon_group(pok2.id, match.idGroup, points, Math.round(hp_left)).subscribe(data => {
                                          if (data['ok'] == 'no') {
                                            alert("Something went wrong");
                                            return;
                                          }
                                          //alert("do kraja");

                                          /* $(document).ready(function () {
                                             $("#" + match.idGroup).prop("disabled", true);
                                           });
       
                                           let id = this.router.snapshot.params.id;
                                           this.find_tournament_by_id(id);*/

                                          //alert(index);
                                          //localStorage.setItem("match" + String(index), JSON.stringify(match));
                                          this.service.set_group_over(match.idGroup).subscribe(data => {
                                            if (data['ok'] == 'no') {
                                              alert("Something went wrong");
                                              return;
                                            }

                                            if ((index + 1) < size) {
                                              this.play_match(matches[index + 1], index + 1, size, matches, indexInGroup);
                                            }
                                            else {
                                              this.num_group_finished++;
                                              this.service.find_pokemon_for_group(match.idGroup).subscribe(data => {
                                                let pok_group: PokemonGroup[];
                                                pok_group = new Array;

                                                pok_group = JSON.parse(JSON.stringify(data));
                                                this.pokemon_groups[indexInGroup] = pok_group;

                                                let number_class: number;
                                                number_class = Number(indexInGroup);
                                                number_class++;
                                                $(document).ready(function () {
                                                  //alert(indexInGroup);
                                                  $("button." + number_class).prop("disabled", true);
                                                  $("#" + match.idGroup).prop("disabled", false);
                                                  $("table." + number_class + " tr:nth-child(1) td:nth-child(2) a").css("color", "green");
                                                  $("table." + number_class + " tr:nth-child(2) td:nth-child(2) a").css("color", "green");
                                                  $("table." + number_class + " tr:nth-child(3) td:nth-child(2) a").css("color", "green");
                                                  $("table." + number_class + " tr:nth-child(4) td:nth-child(2) a").css("color", "green");
                                                  $("table." + number_class + " tr:nth-child(5) td:nth-child(2) a").css("color", "red");
                                                  $("table." + number_class + " tr:nth-child(6) td:nth-child(2) a").css("color", "red");
                                                  $("table." + number_class + " tr:nth-child(7) td:nth-child(2) a").css("color", "red");
                                                  $("table." + number_class + " tr:nth-child(8) td:nth-child(2) a").css("color", "red");
                                                });

                                                for (let i = 0; i < pok_group.length; i++) {
                                                  this.service.set_place_for_pokemon_group(match.idGroup, pok_group[i].idPokemon, i + 1).subscribe(data => {
                                                    if (data['ok'] == 'no') {
                                                      alert("Something went wrong");
                                                      return;
                                                    }
                                                  })
                                                }
                                                if (this.num_of_match_finished == 448) {
                                                  $(document).ready(function () {
                                                    $("#next_stage").prop("disabled", false);
                                                  });
                                                }
                                              })
                                            }
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
            })
          })
        })
      })
    })
  }

  run_all_matches(): void {
    for (let i = 0; i < this.num_of_groups; i++) {
      let pok_group: PokemonGroup;
      pok_group = this.pokemon_groups[String(i)];
      let matches: Match[];
      matches = new Array;

      this.service.find_group(pok_group[0].idGroup).subscribe(data => {
        let group: Group;
        group = JSON.parse(JSON.stringify(data));
        if (group.isOver == 0) {
          //alert(i);
          this.service.find_matches_for_group(pok_group[0].idGroup).subscribe(data => {
            matches = JSON.parse(JSON.stringify(data));
            this.play_match(matches[0], 0, matches.length, matches, String(i));
            /*if (i == this.num_of_groups) {
              $(document).ready(function () {
                $("#next_stage").prop("disabled", false);
              });
            }*/
          })
        }
        /*$(document).ready(function () {
          $("#next_stage").prop("disabled", false);
        });*/
      })

    }


  }

  next_stage(): void {

    let groups_: Group[];
    let num_groups: number;
    let pok_groups: PokemonGroup[];
    groups_ = new Array;
    pok_groups = new Array;
    this.service.find_over_groups_for_tournament(this.id, 1).subscribe(data => {
      groups_ = JSON.parse(JSON.stringify(data));

      num_groups = groups_.length;
      //alert(num_groups);

      this.add_new_match(0, groups_, pok_groups, num_groups);



      //this.router1.navigate(['/tournament_second_groups/' + this.id]);

    })


  }
  group_details(idGroup: Number): void {
    this.router1.navigate(['/group_details/' + idGroup]);
  }


  add_new_match(index: number, groups_: Group[], pok_groups: PokemonGroup[], size: number): void {
    this.service.find_pokemon_who_didnt_passed_for_group(groups_[index].id).subscribe(data => {
      let pok_group: PokemonGroup[];
      pok_group = new Array;
      pok_group = JSON.parse(JSON.stringify(data));

      for (let pg of pok_group) {
        this.service.update_points_tournament(this.id, pg.idPokemon, 1).subscribe(data => {
          if (data['ok'] == 'no') {
            alert("Something went wrong");
            return;
          }
        })
      }
    })
    this.service.find_pokemon_who_passed_for_group(groups_[index].id).subscribe(data => {
      let pok_group: PokemonGroup[];
      pok_group = new Array;
      pok_group = JSON.parse(JSON.stringify(data));

      for (let pg of pok_group) {
        pok_groups.push(pg);
      }
      //alert(pok_groups);
      index++;
      if (index == size) {
        let number_of_matches: number;
        let num: number;


        number_of_matches = pok_groups.length / 2;
        num = pok_groups.length;
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




            let p1: PokemonGroup;
            let p2: PokemonGroup;
            for (let j = 0; j < 2; j++) {
              let index = Math.floor(Math.random() * num);
              num--;
              if (j == 0) {
                p1 = pok_groups[index];
              } else {
                p2 = pok_groups[index];
              }
              pok_groups.splice(index, 1);

            }




            let match_id = match_max_id++;
            this.service.add_new_match(match_id, 0, this.id, p1.idPokemon, p2.idPokemon, "r1").subscribe(data => {
              if (data['ok'] == 'no') {
                alert("Something went wrong");
                return;
              }


              if (i == number_of_matches - 1) {
                localStorage.setItem("t"+this.id+"r1-matches_finished", "0");
                this.router1.navigate(['/tournament_first_round/' + this.id]);
              }
            })

          }
        })

      }
      else {
        this.add_new_match(index, groups_, pok_groups, size);
      }




    })
  }

}
