import { Router } from '@angular/router';
import { UsersInfoService } from 'src/app/services/users-info.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-email-success',
  templateUrl: './email-success.component.html',
  styleUrls: ['./email-success.component.scss']
})
export class EmailSuccessComponent implements OnInit {

  constructor(private ok_link: UsersInfoService,
              private router: Router) {  }

  ngOnInit(): void {
  }



  link_pressed: number = 0;


  show_bar = 0;



  link_verified(){


      this.link_pressed = 1;
      this.show_bar = 1;


      setTimeout( () => {
        this.show_bar = 0;
        this.router.navigate(['new_password']);
      },2000);





    }



}
