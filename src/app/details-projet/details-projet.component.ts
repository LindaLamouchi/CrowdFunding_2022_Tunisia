import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-details-projet',
  templateUrl: './details-projet.component.html',
  styleUrls: ['./details-projet.component.css']
})
export class DetailsProjetComponent implements OnInit {
id:number;
project:any;
cardCaptureReady = false
handler:any = null;
  
  constructor(private userService: UserService,public activatedRoute:ActivatedRoute) {  this.id=activatedRoute.snapshot.params['id'];}

  ngOnInit(): void {
    this.initiateProject();
    
    this.loadStripe();
  }
  initiateProject(){
    this.userService.getProject(this.id).subscribe(data=>{
      this.project=data;
    });
  }
  pay(amount) {    

    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51JKLnqDQsz4BmJ8Qq7GTyn4CcLLkUQ6s1hRnHp9AOcGItlknltVENj46tkGdIv24GkgGMmuYuhLS7j52eDhAPNev00ScRRlVIU',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        alert('Token Created!!');
      }
    });

    handler.open({
      name: 'crowdfun',
      description: '2 widgets',
      amount: amount * 100
    });

  }
  loadStripe() {

    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }

      window.document.body.appendChild(s);
    }
  }

}
