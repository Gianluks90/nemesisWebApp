import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isHandset: Observable<boolean> = this.breakpointObserver
  .observe(Breakpoints.HandsetPortrait)
  .pipe(
    map(result => result.matches)
  );

  public now: Date;
  public isNight: boolean;
  public isLight: boolean;
  public twitchLink: any;

  constructor(private breakpointObserver: BreakpointObserver) { 
    this.isNight = false;
    this.isLight = localStorage.getItem('isLight') === 'true' ? true : false;
  }

  ngOnInit(): void {
    this.now = new Date();
    this.isNight = this.now.getHours() > 18 ||  this.now.getHours() < 7? true : false;
  }

}
