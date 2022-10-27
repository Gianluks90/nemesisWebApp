import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  @Input()
  set teamInfo(data: any) {
    this.incipit = 'Select number of players';
    this.type = data.type;
    this.filteredCharacters = data.characters;
    const expansions = [];
    this.filteredCharacters.forEach(c => expansions.push(c.expansion));
    const setExpansions = [...new Set(expansions)];
    this.onlyAfterMath = (expansions.length === 5 && setExpansions.length === 1 && setExpansions[0] === 'aftermath')? true : false
    console.log('filtered', this.filteredCharacters);
  }

  @Output() closeEmitted = new EventEmitter<boolean>();

  public incipit = '';
  public squad: any[] = [];
  public filteredCharacters: any[];
  public manualNumberClicked = false;
  public squadToChoice: any[];
  public teamCounter = 0;
  public manualSquadCompleted = false;
  public firstCharacterSelected = false;
  public type = '';
  public colorArray = [];
  public choosedColor = [];
  public classicTeam1 = [];
  public classicTeam2 = [];
  public height: any;
  public onlyAfterMath = false;

  constructor() {}

  ngOnInit(): void {}

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
      if (!this.squad.some((e) => e.color === selectedCharacter.color)) {
        this.squad.push(tempArray[index]);
        tempArray.splice(index, 1);
      }
    }
  }

  manualNumberPlayerSelected(arr, n) {
    this.manualNumberClicked = true;
    const tempArray = [...arr];
    this.squadToChoice = [];
    if (this.squad.length === 0) {
      this.teamCounter = n;
    }
    while (this.squadToChoice.length !== 2) {
      const index = Math.floor(Math.random() * tempArray.length);
      const selectedCharacter = tempArray[index];
      if (!this.squad.some((e) => e.color === selectedCharacter.color)) {
        this.squadToChoice.push(tempArray[index]);
        tempArray.splice(index, 1);
      }
    }
  }

  characterSelected(character: any) {
    this.firstCharacterSelected = true;
    if (this.teamCounter > 0) {
      this.squad.push(character);
      this.teamCounter--;
      if (this.teamCounter > 0) {
        this.filteredCharacters = this.filteredCharacters.filter(
          (c) => !c.color.includes(character.color)
        );
        this.manualNumberPlayerSelected(
          this.filteredCharacters,
          this.teamCounter
        );
      } else {
        this.manualSquadCompleted = true;
        this.firstCharacterSelected = false;
      }
    }
  }

  classicMode(arr, n) {
    if (this.onlyAfterMath && n === 5) {
      this.getMoreRandom(arr, n);
    } else {
      this.manualNumberClicked = true;
      const tempArray = [...arr];
      const tempColorArray = [];
      tempArray.forEach((char) => tempColorArray.push(char.color));
      this.colorArray = [...new Set(tempColorArray)];
      if (this.squad.length === 0) {
        this.teamCounter = n;
      }
      this.choosedColor = [];
      this.classicTeam1 = [];
      this.classicTeam2 = [];
      while (this.choosedColor.length !== 2) {
        const index = Math.floor(Math.random() * this.colorArray.length);
        const selectedColor = this.colorArray[index];
        if (!this.choosedColor.some((color) => color === selectedColor)) {
          this.choosedColor.push(this.colorArray[index]);
        }
      }
      tempArray.forEach((char) => {
        if (char.color === this.choosedColor[0]) {
          this.classicTeam1.push(char);
        }
        if (char.color === this.choosedColor[1]) {
          this.classicTeam2.push(char);
        }
      });
    }

  }

  characterSelectedClassic(character: any) {
    this.firstCharacterSelected = true;
    if (this.teamCounter > 0) {
      this.squad.push(character);
      this.teamCounter--;
      if (this.teamCounter > 0) {
        this.filteredCharacters = this.filteredCharacters.filter(
          (c) => !c.color.includes(character.color)
        );
        this.colorArray = this.colorArray.filter(
          (c) => !c.includes(character.color)
        );
        this.classicMode(this.filteredCharacters, this.teamCounter);
      } else {
        this.manualSquadCompleted = true;
        this.firstCharacterSelected = false;
      }
    }
  }

  public stopPropagation(event: any) {
    event.stopPropagation();
  }
}
