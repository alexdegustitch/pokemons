import { Component, OnInit } from '@angular/core';

import { PokemonService } from '../pokemon.service';
import { Type } from '../models/type.model';
import { Pokemon } from '../models/pokemon.model';

import { Router } from '@angular/router';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';


declare var $: any;

@Component({
  selector: 'app-add-pokemon',
  templateUrl: './add-pokemon.component.html',
  styleUrls: ['./add-pokemon.component.css']
})
export class AddPokemonComponent implements OnInit {

  constructor(private router:Router, private service: PokemonService) { }

  ngOnInit(): void {
   
    this.get_all_types();
    
  }

  
  name: String;
  id: Number;
  type1: Number;
  type2: Number;
  about: String;
  health: Number;
  types: Type[];
  message: String;
  added : Boolean;
  gggg: String;

  get_all_types(): void{
    
    this.service.get_all_types().subscribe(data=>{
      
      this.types = JSON.parse(JSON.stringify(data));
      
      
    })
  }

  clear_fields(): void{
    this.message = null;
    this.added = null;
    this.id=null;
    this.type1 = 0;
    this.type2 = 0;
    this.name = null;
    this.health = null;
    this.about = null;

  }

  add_new_pokemon(): void{
      this.message = "";
      this.added = false;
      if(this.name == null || this.id == null || this.health == null || this.about==null)
        {
          this.message = "Submit all the fields.";
          return;
        }
    
      if(isNaN(Number(this.id))){
          this.message += "Pokémon's id must be a number. ";
      }

      if(isNaN(Number(this.health))){
        this.message += "Pokémon's health must be a number. ";
      }


      if(this.type1 == 0){
          this.message = "Pokémon's first type cannot be 'no type'. ";
          return;
      }

      if(this.type1 == this.type2){
          this.message = "Pokémon's second type cannot be the same as the first type. ";
          return;
      }
    
      this.service.find_pokemon_by_id(this.id).subscribe(data=>{
        let pokemon = JSON.parse(JSON.stringify(data));
        if(pokemon != null){
          this.message = "Pokémon already exists.";
          return;
        }else{
          if(this.type2==null){
            this.type2 = 0;
          }
          this.service.add_pokemon(this.id, this.name, this.type1, this.type2, this.health, this.about)
            .subscribe(data=>{
          if(data['ok'] == 'yes'){
            this.message = "Pokémon has been added.";
            this.added = true;
            this.id=null;
            this.type1 = 0;
            this.type2 = 0;
            this.name = null;
            this.health = null;
            this.about = null;
          }
          else{
            this.message = "Pokémon already exists.";
          }
        })
        }
      })

      
    
  }
}
