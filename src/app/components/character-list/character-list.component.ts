import { Component, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterService } from 'src/services/character.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  isHandset: Observable<boolean> = this.breakpointObserver
  .observe(Breakpoints.HandsetPortrait)
  .pipe(
    map(result => result.matches)
  );

  public characters: any;
  public characterSelected: any;
  public filteredCharacters: any[];
  public filters: any;
  public searchString: string;
  public isCompact: boolean;
  public isFilterClosed: boolean;
  public editClicked: boolean;
  public squad: any[];
  public isTeamVisible: boolean;
  public teamData: any;
  public isCharacterClicked: boolean;

  constructor(private characterservice: CharacterService, private breakpointObserver: BreakpointObserver) {
    this.filteredCharacters = [];
    this.filters = {};
    this.searchString = '';
    this.isFilterClosed = false;
    this.editClicked = false;
    this.isTeamVisible = false;
    this.teamData = {};
    this.isCharacterClicked = false;
   }

  ngOnInit(): void {
    this.initCharacterList();
  }

  initCharacterList(){
    this.characterservice.getCharacter().subscribe(c => {
      this.characters = c;
      this.filteredCharacters = c;
    });
  }

  openCloseFilter(){
    this.isFilterClosed = !this.isFilterClosed;
  }

  filterBy(value: any, type: string){
    if (!this.filters[type]) {
      this.filters[type] = [];
    }
    if (this.filters[type].includes(value)){
      this.filters[type].splice(this.filters[type].indexOf(value), 1);
    } else {
      this.filters[type].push(value);
    }
    this.filterCharacters();
  }

  filterCharacters(){
    this.filteredCharacters = this.characters;
    for (const key in this.filters) {
      if (Object.prototype.hasOwnProperty.call(this.filters, key)) {
        const filters = this.filters[key];
        if (filters.length > 0) {
          this.filteredCharacters = this.filteredCharacters.filter(c => filters.some(f => c[key] === f));
        }
      }
    }
  }

  getMoreRandom(arr, n) {
    const tempArray = [...arr];
    this.squad = [];
    while (this.squad.length !== n) {
      const index = Math.floor(Math.random() * tempArray.length);
      const selectedCharacter = tempArray[index];
      if (this.squad.filter(c => c.color.includes(selectedCharacter.color[0])).length === 0) {
        this.squad.push(tempArray[index]);
        tempArray.splice(index, 1);
      }
    }
    console.log('this.squad', this.squad);
  }

  teamButtonsClicked(teamType: string, characters: any) {
    if (this.filteredCharacters.length > 1 || teamType === 'random') {
      this.isTeamVisible = true;
      this.teamData.type = teamType;
      this.teamData.characters = characters;
    }
  }

  characterClicked(character: any){
    this.isCharacterClicked = true;
    this.characterSelected = character;
  }

}
