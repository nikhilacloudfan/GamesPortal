import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Character } from '../models/character';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';

@Injectable()
export class CharacterService {
  readonly baseURI = environment.baseURI;
  characterId: BehaviorSubject<number> = new BehaviorSubject(0);
  designedCharacters: BehaviorSubject<Character[]> = new BehaviorSubject([]);
  count : BehaviorSubject<number> = new BehaviorSubject(0);
  maxCharCount : BehaviorSubject<number> = new BehaviorSubject(0);
  maxCharacterCount = this.maxCharCount.asObservable();
  charactersCount = this.count.asObservable();
  userCharacters = this.designedCharacters.asObservable();
  id = this.characterId.asObservable();

  constructor(private http: HttpClient) { }

  saveCharacter(character) {
    return this.http.post(this.baseURI + '/Character/SaveCharacter', character);
  }

  getAllCharacters() {
    return this.http.get(this.baseURI + '/Character/GetAllCharacters');
  }

  getCharacter(characterId) {
    return this.http.get(this.baseURI + '/Character/GetCharacter/'+characterId);
  }

  updateCharacterId(id){
    this.characterId.next(id);
  }

  saveDesignedCharacter(character){
    return this.http.post(this.baseURI + '/Character/SaveDesignedCharacter', character);
  }

  getAllUserCharacters(){
    return this.http.get(this.baseURI + '/Character/GetAllUserCharacters').subscribe((res:Character[])=>{
      this.updateUserCharacters(res);
    });
  }

  updateUserCharacters(characters: Character[]){
    this.designedCharacters.next(characters);
  }

  updateCharacterCount(count){
    this.count.next(count);
  }

  updateMaxCharacterCountForUsers(count){
    return this.http.get(this.baseURI + '/Character/UpdateMaxCharacterCount/'+count);
  }

  updateMaxCharacterCount(count){
    this.maxCharCount.next(count);
  }

}
