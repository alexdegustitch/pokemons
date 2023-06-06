import { Component, OnInit } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';

declare var $: any;

@Component({
  selector: 'app-connect-fast-attack',
  templateUrl: './connect-fast-attack.component.html',
  styleUrls: ['./connect-fast-attack.component.css']
})


export class ConnectFastAttackComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    this.message = "assets/icons/16t.ico";
    
  
  
  $(document).ready(function(){
    $('.selectpicker').selectpicker('refresh');
    document.images[0].src = "assets/icons/" + 1 + ".ico"; 
    document.images[1].src = "assets/icons/" + 1 + ".ico"; 
        
  }
  )
}

  message: String;

  klik():void{
    
    $('.selectpicker').selectpicker('refresh');
    var x = document.images[0].src;
    alert(x);
  }
}
