import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { PopupService } from '../shared/popup.service';
import { CharacterService } from '../shared/character.service';
import { Character } from '../models/character';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userDetails;
  characters;
  userCharacters: Character[];
  changePassword: boolean = true;
  constructor(private router: Router, private userService: UserService, private popupService: PopupService, private characterService: CharacterService) { }

  ngOnInit() {
    this.characterService.userCharacters.subscribe((res:Character[])=>{
      this.userCharacters = res;
    });
    this.userService.getUserProfile().subscribe(
      (res: any) => {
        this.userDetails = res;
        this.userService.updateUserData(res);
        this.characterService.updateMaxCharacterCount(res.maxCharacterCount);
      },
      err => {
        console.log(err);
      }
    );
    this.characterService.getAllCharacters().subscribe((res:any)=>{
      this.characters = res;
    })
    this.characterService.getAllUserCharacters();

  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onResetPassword(){
    this.popupService.openModal('resetpassword');
  }

  createCharacter(characterId){
    this.characterService.updateCharacterId(characterId);
    this.popupService.openModal('designcharacter');
  }

}
