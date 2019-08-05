import { Component, OnInit, Input } from '@angular/core';
import { CharacterService } from '../../shared/character.service';
import { Character } from '../../models/character';
import { PopupService } from '../../shared/popup.service';
import { ToastrService } from 'ngx-toastr';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-designcharacter',
  templateUrl: './designcharacter.component.html',
  styleUrls: ['./designcharacter.component.css']
})
export class DesigncharacterComponent implements OnInit {

  character: Character;
  characterId: number;
  maxCharacterCount: number;
  totalUserCharacters: number;

  constructor(private characterService: CharacterService, private popupService: PopupService, private toastr: ToastrService) {

  }

  ngOnInit() {
    this.characterService.id.subscribe(id => {
      this.getCharacter(id);
    });

    this.characterService.maxCharacterCount.subscribe((count: any) => {
      this.maxCharacterCount = count;
    });

    this.characterService.designedCharacters.subscribe((res: any) => {
      this.totalUserCharacters = res.length;
    });
  }

  getCharacter(id) {
    this.characterService.getCharacter(id).subscribe((res: Character) => {
      this.character = res;
    });
  }

  cancel() {
    this.popupService.closeModal('designcharacter');
  }

  save() {
    if (this.totalUserCharacters >= this.maxCharacterCount) {
      this.toastr.error("You cannot create characters anymore.", "Limit Exhausted");
      return;
    }
    this.characterService.saveDesignedCharacter(this.character).subscribe((res: any) => {
      if (res == 1) {
        this.toastr.success("You have successfully designed " + this.character.name, "Design Successfull!!");
        this.characterService.getAllUserCharacters();
        this.cancel();
      } else if (res === 2) {
        this.toastr.error("Character Name Already Exists!!");
      } else {
        this.toastr.error('Character Design failed. Please try again.', 'Design failed');
      }
    });
  }

}
