import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  users:any;
  page:number=1;
  pageSize:number=2;//nbr de utili. a afficher sur  admin board
  size:number; //taille de la liste  

  domaines:any;
  libelle:string="";
  pagee:number=1;
  pageSizee:number=2;//nbr de utili. a afficher sur  admin board
  sizee:number;
  constructor(private userService: UserService) { }

  ngOnInit() {
  
  this.getAllUsers();
  this.getDomaines();
  }
  
  getDomaines() {
    this.userService.getAllDomaines().subscribe(data=>{
      this.domaines = data;
      
      this.sizee=this.domaines.length;
    });
  }
  addDom(){
    this.userService.nouvDom(this.libelle).subscribe(
      () => {
        window.location.reload();
      alert('mise a jour effectuée avec succes!');
    
      }
    );
  }
  getAllUsers(){
  this.userService.getAllUsers().subscribe(data=>{
  this.users=data;
  this.size=this.users.length;
  });

  
  }

}

