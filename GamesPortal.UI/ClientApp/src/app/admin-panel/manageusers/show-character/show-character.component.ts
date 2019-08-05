import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../../../models/character';
import { PopupService } from '../../../shared/popup.service';
@Component({
  selector: 'app-show-character',
  templateUrl: './show-character.component.html',
  styleUrls: ['./show-character.component.css']
})
export class ShowCharacterComponent implements OnInit {

  @Input() character: Character;

  constructor(private popupService: PopupService) { }

  ngOnInit() {
  }

  cancel(){
    this.popupService.closeModal('showCharacter');
  }
}
