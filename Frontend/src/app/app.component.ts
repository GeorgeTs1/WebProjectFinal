import { MapComponent } from './components/map/map.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'Frontend';


  @HostListener('window:resize', ['$event'])
onResize(event:any) {
  event.target.innerWidth;
}

}
