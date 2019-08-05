import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { CharacterService } from '../../shared/character.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-createcharacter',
  templateUrl: './createcharacter.component.html',
  styleUrls: ['./createcharacter.component.css']
})
export class CreatecharacterComponent implements OnInit {

  characterForm: FormGroup;
  characters;
  maxCharacterCount: number;
  copyMaxCharacterCount: number;
  constructor(private fb: FormBuilder, private characterService: CharacterService, private toastr: ToastrService, private userService: UserService) { }

  ngOnInit() {
    /* Initiate the form structure */
    this.characterForm = this.fb.group({
      characterName: [],
      properties: this.fb.array([this.fb.group({ property: '' })])
    });
    this.getAllCharacters();

    this.userService.getUserProfile().subscribe(
      (res: any) => {
        this.characterService.updateMaxCharacterCount(res.maxCharacterCount);
      },
      err => {
        console.log(err);
      }
    );

    this.characterService.maxCharacterCount.subscribe((count: any) => {
      this.maxCharacterCount = count;
      this.copyMaxCharacterCount = count;
    });
  }

  get properties() {
    return this.characterForm.get('properties') as FormArray;
  }

  addProperty() {
    this.properties.push(this.fb.group({ property: '' }));
  }

  deleteProperty(index) {
    this.properties.removeAt(index);
  }

  saveCharacter() {
    this.characterService.saveCharacter(this.characterForm.value).subscribe((res: any) => {
      if (res === 1) {
        this.getAllCharacters();
        this.toastr.success('New character created!', 'Character Creation Successfull');
        this.characterForm = this.fb.group({
          characterName: [],
          properties: this.fb.array([this.fb.group({ property: '' })])
        });

      } else if (res === 2) {
        this.toastr.error('Character Name already exists!!');
      } else {
        this.toastr.error(res, 'Character Creation failed');
      }
    })
  }

  getAllCharacters() {
    this.characterService.getAllCharacters().subscribe((res: any) => {
      this.characters = res;
      this.characterService.updateCharacterCount(res.length);
    })
  }

  saveMaxCharacterCount() {
    if (this.maxCharacterCount < this.copyMaxCharacterCount) {
      this.toastr.error('Max character count cannot be reduced below ' + this.copyMaxCharacterCount);
      return;
    }
    this.characterService.updateMaxCharacterCountForUsers(this.maxCharacterCount).subscribe((res: any) => {
      if (res === 1) {
        this.toastr.success('Character count saved successfully', 'Success');
        this.characterService.updateMaxCharacterCount(this.maxCharacterCount);
      }
      else
        this.toastr.error('failed to save maximum characters', 'Error');
    })
  }
}
