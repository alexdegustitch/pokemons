import { Component, OnInit } from '@angular/core';

import { PokemonService } from '../pokemon.service';
import { Type } from '../models/type.model';
import { Pokemon } from '../models/pokemon.model';
import { Tournament } from '../models/tournaments.model';

import { Router } from '@angular/router';
import { tokenReference } from '@angular/compiler';
declare var $: any;

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {

  constructor(private router: Router, private service: PokemonService) { }

  ngOnInit(): void {
  }

  name: String;
  tournaments: Tournament[];

  add_new_tournament(): void {

    localStorage.setItem("tour_name", JSON.stringify(this.name));
    let tour_max_id: number;
    this.service.get_all_pokemon().subscribe(data => {
      let pokemon: Pokemon[];
      pokemon = new Array;
      pokemon = JSON.parse(JSON.stringify(data));

      let num_of_groups = Math.round((pokemon.length - 4) / 6);
      let num = pokemon.length;
      //alert(num);
      this.service.get_tournament_max_id().subscribe(data => {
        let tr_max_id = JSON.parse(JSON.stringify(data));

        //alert(tr_max_id);
        if (tr_max_id == "") {

          tour_max_id = 1;
          this.service.delete_from_points().subscribe(data => {

            if (data['ok'] == 'no') {
              alert("Something went wrong");
              return;
            }
            //alert('sledi dodavanje u points');
            for (let i = 0; i < pokemon.length; i++) {
              this.service.add_to_points(pokemon[i].id, pokemon[i].name).subscribe(data => {
                if (data['ok'] == 'no') {
                  alert("Something went wrong");
                  return;
                }
              })

            }
          })
        }
        else {
          tour_max_id = tr_max_id[0].id + 1;
        }
        localStorage.setItem("t" + tour_max_id + "g1-matches_finished", "0");

        for (let i = 0; i < pokemon.length; i++) {
          this.service.add_points_tournament(tour_max_id, pokemon[i].id).subscribe(data => {
            if (data['ok'] == 'no') {
              alert("Something went wrong");
              return;
            }
          })
        }
        
        this.service.add_new_tournament(tour_max_id, this.name).subscribe(data => {
          if (data['ok'] == 'no') {
            alert("Something went wrong");
            return;
          }
          this.service.get_group_max_id().subscribe(data => {
            let gr_max_id = JSON.parse(JSON.stringify(data));

            let max_id: number;
            //alert("gr max" + gr_max_id);

            if (gr_max_id == "") {
              max_id = 1;
            }
            else {
              max_id = gr_max_id[0].id + 1;
            }
            //alert("max id" + max_id);
            this.service.get_match_max_id().subscribe(data => {
              let mt_max_id = JSON.parse(JSON.stringify(data));

              let match_max_id: number;
              if (mt_max_id == "") {
                match_max_id = 1;
              }
              else {
                match_max_id = mt_max_id[0].id + 1;
              }

              //alert(num_of_groups);
              for (let i = 0; i < num_of_groups; i++) {
                let group_id = max_id++;
                this.service.add_new_group(group_id, String(i + 1), tour_max_id, 2).subscribe(data => {
                  let pokemon_s: Pokemon[];
                  pokemon_s = new Array;
                  for (let j = 0; j < 6; j++) {
                    let index = Math.floor(Math.random() * num);
                    num--;
                    let p: Pokemon;
                    //localStorage.setItem("index", JSON.stringify(index));
                    //localStorage.setItem("pokemons", JSON.stringify(pokemon));

                    p = { 'id': pokemon[index].id, 'about': pokemon[index].about, 'health': pokemon[index].health, 'name': pokemon[index].name, 'type1': pokemon[index].type1, 'type2': pokemon[index].type2 };
                    //alert(p);
                    //localStorage.setItem("pok", JSON.stringify(p));
                    if (p.id == 132 || p.id == 242 || p.id == 440 || p.id == 113) {
                      //alert("Ok");
                      //pokemon.splice(index, 1);
                      --j;
                    } else {
                      pokemon_s.push(p);

                    }
                    pokemon.splice(index, 1);
                    //alert(pokemon);
                  }
                  //alert(pokemon_s);
                  for (let br = 0; br < pokemon_s.length; br++) {
                    this.service.add_pokemon_to_group(group_id, pokemon_s[br].id, pokemon_s[br].name).subscribe(data => {
                      //alert(group_id);
                      if (data['ok'] == 'no') {
                        alert("Something went wrong");
                        return;
                      }
                      if (br == pokemon_s.length - 1 && i == num_of_groups - 1) {
                        //alert("ok");
                        this.router.navigate(['/tournament_groups/' + tour_max_id]);
                      }
                    })
                  }
                  for (let m = 0; m < 5; m++) {
                    for (let n = m + 1; n < 6; n++) {
                      let match_id = match_max_id++;
                      this.service.add_new_match(match_id, group_id, tour_max_id, pokemon_s[m].id, pokemon_s[n].id, "g1").subscribe(data => {
                        if (data['ok'] == 'no') {
                          alert("Something went wrong");
                          return;
                        }
                        this.service.add_new_match_group(match_id, group_id).subscribe(data => {
                          if (data['ok'] == 'no') {
                            alert("Something went wrong");
                            return;
                          }
                        })
                      })

                    }
                  }
                }
                )
              }
            })
          })

        })

        //this.router.navigate(['/tournament_groups/' + tour_max_id]);
      })


    })


  }
}
