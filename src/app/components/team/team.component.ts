import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  @Input()
  set teamInfo(data: any) {
    // this.incipit = data.type === 'random'? "Random players number" : "Manual players number";
    this.incipit = "Select number of players";
    this.type = data.type;
    console.log('datatype', this.type)
    this.random = data.type === 'random'? true : false;
    this.filteredCharacters = data.characters;
  }

  @Output() closeEmitted = new EventEmitter<boolean>();

  public incipit = '';
  public random: boolean = false;
  public squad: any[] = [];
  public filteredCharacters: any[];
  public manualNumberClicked: boolean = false;
  public squadToChoice: any[];
  public teamCounter: number = 0;
  public manualSquadCompleted: boolean = false;
  public firstCharacterSelected: boolean = false;
  public type = '';

  constructor() { }

  ngOnInit(): void {
  }

  closeComponent() {
    this.closeEmitted.emit(true);
  }

  getMoreRandom(arr, n) {
    console.log('getMoreRandom', arr, n);

    const tempArray = [...arr];
    this.squad = [];
    while (this.squad.length !== n) {
      const index = Math.floor(Math.random() * tempArray.length);
      const selectedCharacter = tempArray[index];
      if (!this.squad.some(e => e.color === selectedCharacter.color)) {
        this.squad.push(tempArray[index]);
        tempArray.splice(index, 1);
      }
    }
  }

  manualNumberPlayerSelected(arr, n){
    this.manualNumberClicked = true;
    const tempArray = [...arr];
    this.squadToChoice = [];
    if (this.squad.length === 0) {
      this.teamCounter = n;
    }
      while (this.squadToChoice.length !== 2) {
        const index = Math.floor(Math.random() * tempArray.length);
        const selectedCharacter = tempArray[index];
        if (!this.squad.some(e => e.color === selectedCharacter.color)) {
          this.squadToChoice.push(tempArray[index]);
          tempArray.splice(index, 1);
        }
      }
  }

  // getMoreRandom(arr, n) {
  //   console.log('getMoreRandom', arr, n);

  //   const tempArray = [...arr];
  //   this.squad = [];
  //   while (this.squad.length !== n) {
  //     const index = Math.floor(Math.random() * tempArray.length);
  //     const selectedCharacter = tempArray[index];
  //     if (this.squad.filter(c => c.color.includes(selectedCharacter.color[0])).length === 0) {
  //       this.squad.push(tempArray[index]);
  //       tempArray.splice(index, 1);
  //     }
  //   }
  // }

  // manualNumberPlayerSelected(arr, n){
  //   this.manualNumberClicked = true;
  //   const tempArray = [...arr];
  //   this.squadToChoice = [];
  //   if (this.squad.length === 0) {
  //     this.teamCounter = n;
  //   }
  //     while (this.squadToChoice.length !== 2) {
  //       const index = Math.floor(Math.random() * tempArray.length);
  //       const selectedCharacter = tempArray[index];
  //       if (this.squadToChoice.filter(c => c.color.includes(selectedCharacter.color[0])).length === 0) {
  //         this.squadToChoice.push(tempArray[index]);
  //         tempArray.splice(index, 1);
  //       }
  //     }
  // }

  characterSelected(character: any){
    this.firstCharacterSelected = true;
    if (this.teamCounter > 0) {
      this.squad.push(character);
      this.teamCounter--;
      if (this.teamCounter > 0) {
        this.filteredCharacters = this.filteredCharacters.filter(c => !c.color.includes(character.color));
        this.manualNumberPlayerSelected(this.filteredCharacters, this.teamCounter);
      } else {
        this.manualSquadCompleted = true;
        this.firstCharacterSelected = false;
      }
    }
  }
}
