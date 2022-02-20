import { startWith } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { map, Observable } from 'rxjs';


@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.scss']
})
export class UsersInfoComponent implements OnInit {

  isOverlayOpen: Observable<boolean>

  constructor() { }

  ngOnInit(): void {

    this.isOverlayOpen.pipe(
      startWith(false)
    );

  }

  openOverlay()
  {

    this.isOverlayOpen.subscribe( (val)=>{
          val=true;
    })

  }





}
