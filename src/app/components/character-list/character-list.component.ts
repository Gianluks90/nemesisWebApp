import { Component, OnInit } from '@angular/core';
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
  public isCharacterSelected: any;
  public filteredCharacters: any[];
  public filterGrade: any[];
  public filterRace: any[];
  public filterAttribute: any[];
  public filters: any;
  public searchString: string;
  public isCompact: boolean;
  // public isLight: boolean;
  public isFilterClosed: boolean;
  public bannerCharacters: any[];
  public editClicked: boolean;
  public squad: any[];

  constructor(private characterservice: CharacterService, private breakpointObserver: BreakpointObserver) {
    this.filteredCharacters = [];
    this.filterGrade = [];
    this.filterRace = [];
    this.filterAttribute = [];
    this.filters = {};
    this.searchString = '';
    this.isCompact = localStorage.getItem('isCompact') === 'true'? true : false;
    // this.isLight = localStorage.getItem('isLight') === 'true'? true : false;
    this.isFilterClosed = false;
    this.editClicked = false;
    this.bannerCharacters = [];
   }

  ngOnInit(): void {
    this.initCharacterList();
  }

  initCharacterList(){
    this.characterservice.getCharacter().subscribe(c => {
      this.characters = c;
      this.filteredCharacters = c;
    })
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
      this.filters[type].push(value)
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
    console.log('this.squad', this.squad)
  }

  toTopPage(){
    window.scrollTo(0,0);
  }

  characterClicked(character: any){
    if (this.bannerCharacters.length > 0) {
      if (this.bannerCharacters.find(c => c.name === character.name)) {
        this.bannerCharacters = this.bannerCharacters.filter(c => c.name !== character.name);
      } else {
        this.bannerCharacters.push(character);
      }
    } else {
      this.bannerCharacters.push(character);
    }
  }

}
