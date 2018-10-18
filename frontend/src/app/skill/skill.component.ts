import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
    
 item ={
    title: '',
    description:''
  };
  newArray = [];
  constructor() { }

  ngOnInit() {
  }
  
  onSubmit(){
    
   this.newArray.push(this.item);
    
    console.log(this.newArray);
  }

}
