import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: string;
  projects:any={};
  page:number=1;
  pageSize:number=3;//nbr de prjts. a afficher sur  admin board
  size:number; //taille de la liste  
  opened: boolean = false;
  isShown:boolean=false;
  
  color:string;
  buttonColor: string;
  i:number=1;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getAllProjects();
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }
  getAllProjects(){
  this.userService.getAllProjects().subscribe(data=>{
  this.projects=data;
  });
  this.size=this.projects.length;
  console.log(this.size)
  }
  DetailsProject(id){
    this.router.navigate(['details',id]);
  }
}

