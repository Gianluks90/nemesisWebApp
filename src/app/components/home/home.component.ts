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

  public isLockdown: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {

  }

  public changeVersion() {
    this.isLockdown = !this.isLockdown;
  }

}
