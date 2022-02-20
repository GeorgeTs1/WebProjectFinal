import { UsersStatsComponent } from './../users-stats/users-stats.component';
import { ConfirmEmailComponent } from './../confirm-email/confirm-email.component';
import { UsersInfoService } from './../../services/users-info.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, HostBinding, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { fromEvent, Observable, of, Subscription } from 'rxjs';
import { DarkModeService } from 'angular-dark-mode';
import { ComponentPortal } from '@angular/cdk/portal';
import { User } from 'src/app/models/User';
import { ForgotUsernameComponent } from '../forgot-username/forgot-username.component';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {


  public innerWidth:any;

  public innerHeight:any;

  change_Menu = false;

  isOpen = false;

  showOverlay = true;


  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;


  users_email :  Pick<User,"email">;

  new_username: string;

  new_password: string;

  save_username : number = 0;

  wait:number = 0;

  admin:boolean = false;

  light_mode:Boolean = true;

  isMobile: Boolean = false;


  constructor(private auth: AuthService,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private darkModeService: DarkModeService,
    public dialog: MatDialog,
    private users_info : UsersInfoService
     ) {

      this.matIconRegistry.addSvgIcon(
        `acc_4light`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/img/acc_4light.svg")
      );

      this.matIconRegistry.addSvgIcon(
        `acc_4dark`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/img/acc_4dark.svg")
      );

  }

  ngOnInit(): void {


    this.auth.isUserLoggedIn$.subscribe( (isLoggedIn:any)=>{
      this.change_Menu = isLoggedIn;
      console.log("change_menu",this.change_Menu);
      this.users_email = this.auth.userEmail;
    });

        this.auth.isAdminLoggedIn$.subscribe( (isAdmin:any)=>{
          this.admin  = isAdmin;
          this.change_Menu = isAdmin;
          this.users_email = this.auth.userEmail;
        })



}




  onClickedOutside(e: Event) {
    this.showOverlay = false;
  }


  @HostListener('window:resize', ['$event'])
    onResize(event:any) {


    }



  onToggle(): void {

    this.darkMode$.subscribe(val=>{
      if(val==true)
      {
        this.light_mode = false;
      }

      else
      {
        this.light_mode = true;
      }
    })

    this.darkModeService.toggle();

  }


  logout(): void {
    localStorage.removeItem("token");
    this.auth.isUserLoggedIn$.next(false);
    this.auth.isAdminLoggedIn$.next(false);
    this.auth.logout(this.users_email).subscribe( (val:string) =>{
        console.log(val);
     });
    this.router.navigate(["login"]);
  }

  covid(): void
  {
    this.router.navigate(["CovidForm"]);
  }


  map():void
  {
    this.router.navigate(["map"]);
  }



  open_username_dialog(){


     let dialogRef = this.dialog.open(ForgotUsernameComponent,{
      height: '50vh',
      width: '70vw',
      data: { message:"Is it ok to store your visit?" },
      position: {right: '25vh', top: '20vh'}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
        console.log(result.data);
        if (result === undefined) result = 0;
          this.new_username = result.data;
          this.users_info.save_new_username(this.new_username,this.users_email)
          .subscribe( (ok:any)=>{
            this.save_username = ok;
            setTimeout( ()=>{
              return this.save_username = 0;
            },2000)
          });

  });
  }

  open_email_confirm()
  {

    this.wait=1;


    let dialogRef = this.dialog.open(ConfirmEmailComponent,{
      height: '50vh',
      width: '70vw',
      data: { message:"Is it ok to store your visit?" },
      position: {right: '25vh', top: '20vh'}

    });

    dialogRef.afterClosed().subscribe((result:any) => {
        if (result === undefined) result = 0;
          this.new_password = result.data;
          });


  }


  open_user_stats()
  {

    this.wait=1;


    let dialogRef = this.dialog.open(UsersStatsComponent,{
      height: '70vh',
      width: '80vw',
      data: { message:"Is it ok to store your visit?" },
      position: {right: '28vh', top: '20vh'}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
        if (result === undefined) result = 0;
          this.new_password = result.data;
          });

  }



  open_password_dialog(){



    let dialogRef = this.dialog.open(ForgotPasswordComponent,{
     height: '600px',
     width: '600px',
     data: { message:"Is it ok to store your visit?" }
   });

   dialogRef.afterClosed().subscribe((result:any) => {
       console.log(result.data,"aaaa");
       if (result === undefined) result = 0;
         this.new_password = result.data;
         });

 }




}
