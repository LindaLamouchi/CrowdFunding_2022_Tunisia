import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetailsProjetComponent } from '../details-projet/details-projet.component';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  projects:any={};
  Contrats:any={};
  page:number=1;
 
  pageSize:number=3;//nbr de prjts. a afficher sur  admin board
  size:number; //taille de la liste  
  opened: boolean = false;
  isShown:boolean=false;
  
  color:string;
  buttonColor: string;
  i:number=1;
  currentUser:any;
  userId:number;

  pagee:number=1;
  pageSizee:number=5;//nbr de utili. a afficher sur  admin board
  sizee:number; //taille de la liste  


  form: any = {};
  isSignUpFailed = false;
  errorMessage = '';
  domId:number;
  selectedDomaine:any;
  domaines: any;

  constructor(private userService: UserService, private router: Router,private token: TokenStorageService) { }

  ngOnInit() { 
    this.userId = this.token.getUser().id;
    this. getContrats()
    this.getDomaines();

    this.getAllProjects();
  }

  getContrats(){
    this.userService.getContrats( this.userId).subscribe(data=>{
      this.Contrats=data;
    });
    console.log(this.Contrats)
    this.sizee=this.Contrats.length;
    
  }
  getAllProjects(){
      this.userService.getProjects( this.userId).subscribe(data=>{
      this.projects=data;
    });
    this.size=this.projects.length;
    
  }
 

   toggleShow(){
    this.isShown = ! this.isShown;
  }
  
  addEvent(){
    this.i++;
   if(this.i%2==0) {
    this.buttonColor = 'teal'; //desired Color
    this.color='white'
   }
   else{
    this.buttonColor = 'white'; //desired Color
    this.color='black'
   }
    
    
    }
    getDomaines() {
      this.userService.getAllDomaines().subscribe(data=>{
        this.domaines = data;
      });
    }
    scroll(el: HTMLElement) {
      el.scrollIntoView({behavior: 'smooth'});
    }
    DetailsProject(id){
      this.router.navigate(['details',id]);
    }
    selectChangeHandler (event: any) {
      //update the ui
      this.domId = event.target.value;
    }
    onSubmit() {
      if(this.domId!=undefined)
      //console.log(this.domId)
      this.userService.newProject(this.form,
        this.domId
        ,this.userId).subscribe(
        data => {
          console.log(data);
          this.isSignUpFailed = false;
          window.location.reload();
          alert("Ajout en succes!")
          location.reload();
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
          location.reload();
        }
      );
    }

    deleteProject(id:number){
      this.userService.deleteProject(id);
      location.reload();
    }
}


