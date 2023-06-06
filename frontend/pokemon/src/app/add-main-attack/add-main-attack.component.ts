import { Component, OnInit } from '@angular/core';

import { PokemonService } from '../pokemon.service';
import { Type } from '../models/type.model';
import { Pokemon } from '../models/pokemon.model';

import { Router } from '@angular/router';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { typeofExpr } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-add-main-attack',
  templateUrl: './add-main-attack.component.html',
  styleUrls: ['./add-main-attack.component.css']
})
export class AddMainAttackComponent implements OnInit {

  constructor(private router:Router, private service: PokemonService) { }

  ngOnInit(): void {
    this.get_all_types();
  }

  name: String;
  type: Number;
  damage: Number;
  energy: Number;
  duration: Number;
  types: Type[];
  message: String;
  added : Boolean;

  get_all_types(): void{
    
    this.service.get_all_types().subscribe(data=>{
      
      this.types = JSON.parse(JSON.stringify(data));
      for(let type of this.types){
        if(type.id==0){
          type.name = "select type";
        }
      }
    })
  }

  clear_fields(): void{
    this.message = null;
    this.added = null;
    this.name=null;
    this.type = 0;
    this.damage = null;
    this.duration = null;
    this.energy = null;

  }

  add_new_main_attack(): void{
      this.message = "";
      this.added = false;
      if(this.name == null || this.energy == null || this.duration == null || this.damage==null)
        {
          this.message = "Submit all the fields.";
          return;
        }
    
      if(isNaN(Number(this.damage))){
          this.message += "Damage must be a number. ";
      }

      if(isNaN(Number(this.energy))){
        this.message += "Energy must be a number. ";
      }

      if(isNaN(Number(this.duration))){
        this.message += "Energy must be a number. ";
      }


      if(this.type == 0){
          this.message = "You must choose attack's type. ";
          return;
      }
    
      this.service.find_main_attack_by_name(this.name).subscribe(data=>{
        let fast_attack = JSON.parse(JSON.stringify(data));
        if(fast_attack != null){
          this.message = "Main Attack already exists.";
          return;
        }else{
          this.service.get_main_attack_max_id().subscribe(data=>{
            let attack = JSON.parse(JSON.stringify(data));
            //localStorage.setItem("je", attack);
            let id = -1;
            if(attack == ""){
             
              id = 1;
            }else{
              
              id = attack[0].id + 1;
            }
            this.service.add_main_attack(id, this.name, this.type, this.damage, this.energy, this.duration)
            .subscribe(data=>{
          if(data['ok'] == 'yes'){
            this.message = "Main Attack has been added.";
            this.added = true;
            this.name=null;
            this.type = 0;
            this.duration = null;
            this.energy = null;
            this.damage = null;
          }
          else{
            this.message = "Main Attack already exists.";
          }
        })
          })
          
        }
      })

      
    
  }

}
