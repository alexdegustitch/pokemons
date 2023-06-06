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
import { Points } from '../models/points.model';
import { PointsTournament } from '../models/pointsTournament.model';

declare var $: any;
@Component({
  selector: 'app-table-points',
  templateUrl: './table-points.component.html',
  styleUrls: ['./table-points.component.css']
})
export class TablePointsComponent implements OnInit {

  constructor(private router: ActivatedRoute, private router1: Router, private service: PokemonService) { }

  ngOnInit(): void {
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
    
    this.get_all_points();
  }

  pokemon: Points[];

  get_all_points(): void{
    this.pokemon = new Array;
    this.service.get_all_points().subscribe(data=>{
      this.pokemon = JSON.parse(JSON.stringify(data));
    })
  }
}
