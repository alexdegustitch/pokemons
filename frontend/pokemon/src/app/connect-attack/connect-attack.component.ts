import { Component, OnInit } from '@angular/core';

import { PokemonService } from '../pokemon.service';
import { Type } from '../models/type.model';
import { Pokemon } from '../models/pokemon.model';
import { FastAttack } from '../models/fastAttack.model';
import { MainAttack } from '../models/mainAttack';
import { PokemonFastAttack } from '../models/pokemonFastAttack.model';
import { PokemonMainAttack } from '../models/pokemonMainAttack.model';

import { Router } from '@angular/router';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { typeofExpr } from '@angular/compiler/src/output/output_ast';

declare var $: any;


@Component({
  selector: 'app-connect-attack',
  templateUrl: './connect-attack.component.html',
  styleUrls: ['./connect-attack.component.css']
})
export class ConnectAttackComponent implements OnInit {

  constructor(private router:Router, private service: PokemonService) { }

  ngOnInit(): void {
    
    this.get_all_pokemon();
    this.get_all_fast_attacks();
    this.get_all_main_attacks();
    $(document).ready(function(){
      $('.selectpicker').selectpicker('refresh');
  });
  }

  types: Type[];
  idPokemon : Number;
  idFastAttack : Number[];
  idMainAttack : Number[];
  fast_attacks : FastAttack[];
  main_attacks : MainAttack[];
  pokemon : Pokemon[];
  message: String;
  redAlertShow: Boolean;
  greenAlertShow: Boolean;
  message1: String;

  not_first_attack_red: Boolean;
  not_first_attack_green: Boolean;

  more_than_one_red: Boolean;
  more_than_one_green: Boolean;

  get_all_pokemon(): void{
    this.service.get_all_pokemon().subscribe(data=>{
      this.pokemon = JSON.parse(JSON.stringify(data));
      $(document).ready(function(){
        $('.selectpicker').selectpicker('refresh');
    });
    })
  }

  get_all_fast_attacks(): void{
    this.service.get_all_fast_attacks().subscribe(data=>{
      this.fast_attacks = JSON.parse(JSON.stringify(data));
      $(document).ready(function(){
        $('.selectpicker').selectpicker('refresh');
    });
    })
  }

  get_all_main_attacks(): void{
    this.service.get_all_main_attacks().subscribe(data=>{
      this.main_attacks = JSON.parse(JSON.stringify(data));
      $(document).ready(function(){
        $('.selectpicker').selectpicker('refresh');
    });
    })
  }
  
  add_attacks_for_pokemon(): void{
    this.message=null;
    this.redAlertShow = false;
    this.greenAlertShow = false;
    if(this.idPokemon==null){
     this.message = "Select a Pokémon."; 
     this.redAlertShow = true;
     return;
    }

    if(this.idFastAttack == null && this.idMainAttack == null){
      this.message = "Select at least 1 attack.";
      this.redAlertShow = true;
      return;
    }
    
    this.not_first_attack_red = false;
    this.not_first_attack_green = false;

    this.more_than_one_red = false;
    this.more_than_one_green = false;
    //alert("Pokemon " + this.idPokemon + ", Fast Attack " + this.idFastAttack[0]  + ", Main Attack " + this.idMainAttack);
    //localStorage.setItem("attacks", JSON.stringify(this.idFastAttack));
    this.service.find_pokemon_by_id(this.idPokemon).subscribe(data=>{

      let current_pokemon: Pokemon = JSON.parse(JSON.stringify(data));
      //alert(current_pokemon);
      if(this.idFastAttack!=null){
      for(var attack in this.idFastAttack){
        this.add_pokemon_fast_attack(current_pokemon, attack);
        
      }
      }

      if(this.idMainAttack!=null){
        //alert(this.idMainAttack);
      for(var attack in this.idMainAttack){
        this.add_pokemon_main_attack(current_pokemon, attack);
      }
    }
  

    
    

    //alert("stigao sam " + this.message + this.message1);
   

    }
    
    
    )
    
    
  }


  clear_fields(): void{
    //alert(this.idMainAttack.length);
    this.idMainAttack = null;
    this.idPokemon = null;
    this.idFastAttack = null;
    if(this.more_than_one_red){
      this.message += " attacks have been already added for this Pokémon. ";
    }else{
      this.message += " attack has been already added for this Pokémon. ";
    }
    
    if(this.more_than_one_green){
      this.message1 += " attacks are added for this Pokémon. ";
    }else{
      this.message1 += " attack is added for this Pokémon. ";
    }

    $(document).ready(function(){
      $('.selectpicker').selectpicker('refresh');
  });
  }

  add_pokemon_main_attack(current_pokemon: Pokemon, attack: string): void{
    this.service.find_main_attack_by_id(this.idMainAttack[attack]).subscribe(data=>{
      let current_attack:MainAttack = JSON.parse(JSON.stringify(data));

      this.service.find_pokemon_main_attack(this.idPokemon, this.idMainAttack[attack]).subscribe(data=>{
        let a = JSON.parse(JSON.stringify(data));
        //alert(a);
        if(a == null){
          this.service.get_pokemon_main_attack_max_id().subscribe(data=>{
            let main_attack = JSON.parse(JSON.stringify(data));
            //localStorage.setItem("je", attack);
            let id = -1;
            if(main_attack == ""){   
              id = 1;
            }else{         
              id = main_attack[0].id + 1;
            }
            let sameType: Number;
            if(current_pokemon.type1 == current_attack.type || current_pokemon.type2 == current_attack.type){
              sameType = 1;
            }
            else{
              sameType = 0;
            }
            this.service.add_pokemon_main_attack(id, this.idPokemon, this.idMainAttack[attack], sameType).subscribe(data=>{
              if(data['ok'] == 'yes'){
                if(this.not_first_attack_green){
                  this.more_than_one_green = true;
                  this.message1+=", " + current_attack.name;
                }else{
                  this.not_first_attack_green = true;
                  this.message1=current_attack.name;
                }
                this.greenAlertShow = true;
                
              }
              else{
                this.redAlertShow = true;
                if(this.not_first_attack_red){
                  this.more_than_one_red = true;
                  this.message+=", " + current_attack.name;
                }else{
                  this.not_first_attack_red = true;
                  this.message=current_attack.name;
                }
              }

              if(Number(attack) == (this.idMainAttack.length-1)){
                //this.clear_fields();
              }

            })
          })
        }else{
          this.redAlertShow = true;
          if(this.not_first_attack_red){
            this.more_than_one_red = true;
            this.message+=", " + current_attack.name;
          }else{
            this.not_first_attack_red = true;
            this.message=current_attack.name;
          }

          if(Number(attack) == (this.idMainAttack.length-1)){
            //this.clear_fields();
          }
        }
      })
    })
  }
  add_pokemon_fast_attack(current_pokemon: Pokemon, attack: string): void{
    //alert("Attack :" + attack);
        this.service.find_fast_attack_by_id(this.idFastAttack[attack]).subscribe(data=>{
          let current_attack:FastAttack = JSON.parse(JSON.stringify(data));
  
          this.service.find_pokemon_fast_attack(this.idPokemon, this.idFastAttack[attack]).subscribe(data=>{
            let a = JSON.parse(JSON.stringify(data));
            //alert(this.idPokemon + " " + this.idFastAttack[attack] + " " + a);
            if(a == null){
              this.service.get_pokemon_fast_attack_max_id().subscribe(data=>{
                let fast_attack = JSON.parse(JSON.stringify(data));
                //localStorage.setItem("je", attack);
                let id = -1;
                if(fast_attack == ""){   
                  id = 1;
                }else{         
                  id = fast_attack[0].id + 1;
                }
                let sameType: Number;
                if(current_pokemon.type1 == current_attack.type || current_pokemon.type2 == current_attack.type){
                  sameType = 1;
                }
                else{
                  sameType = 0;
                }
                this.service.add_pokemon_fast_attack(id, this.idPokemon, this.idFastAttack[attack], sameType).subscribe(data=>{
                  if(data['ok'] == 'yes'){
                    if(this.not_first_attack_green){
                      this.more_than_one_green = true;
                      this.message1+=", " + current_attack.name;
                    }else{
                      this.not_first_attack_green = true;
                      this.message1=current_attack.name;
                    }
                    this.greenAlertShow = true;
                  
                  }
                  else{
                    this.redAlertShow = true;
                    if(this.not_first_attack_red){
                      this.more_than_one_red = true;
                      this.message+=", " + current_attack.name;
                    }else{
                      this.not_first_attack_red = true;
                      this.message=current_attack.name;
                    }
                  }
                  
                  if(this.idMainAttack==null && (Number(attack) == this.idFastAttack.length-1)){
                    //this.clear_fields();
                  }

                })
              })
            }else{
              this.redAlertShow = true;
              if(this.not_first_attack_red){
                this.more_than_one_red = true;
                this.message+=", " + current_attack.name;
              }else{
                this.not_first_attack_red = true;
                this.message=current_attack.name;
              }
              if(this.idMainAttack==null && (Number(attack) == this.idFastAttack.length-1)){
                //this.clear_fields();
              }
            }
          })
        })
  }

}
