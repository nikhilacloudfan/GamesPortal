import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';
import { Character } from '../../models/character';
import { PopupService } from '../../shared/popup.service';
@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.css']
})
export class ManageusersComponent implements OnInit {
  users;
  character;
  constructor(private userService: UserService, private popupService: PopupService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      (res: any) => {
        this.users = res;
        this.userService.updateUsersCount(res.length);
      },
      err => {
        console.log(err);
      }
    );
  }

  showCharacter(character:Character){
    this.character = character;
    this.popupService.openModal('showCharacter');
  }

}
