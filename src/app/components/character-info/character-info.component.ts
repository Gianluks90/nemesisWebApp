import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-character-info',
  templateUrl: './character-info.component.html',
  styleUrls: ['./character-info.component.scss']
})
export class CharacterInfoComponent implements OnInit {

  public character: any;

  @Input()
  set characterReceived(character: any) {
    this.character = character;
  }

  @Output() closeEmitted = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  closeComponent() {
    this.closeEmitted.emit(true);
  }

  public stopPropagation(event: any) {
    event.stopPropagation();
  }

}
