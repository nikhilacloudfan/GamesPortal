import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { CharacterService } from '../shared/character.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  userData;
  usersCount: number;
  charactersCount: number;
  constructor(private userService: UserService, private characterService: CharacterService, private router: Router) { }

  ngOnInit() {
    this.characterService.charactersCount.subscribe((count:any)=>{
      this.charactersCount = count;
    });

    this.userService.usersCount.subscribe(count =>{
      this.usersCount = count;
    });
    this.userService.userData.subscribe(data => {
      this.userData = data;
    }); 

    this.characterService.getAllCharacters().subscribe((res:any)=>{
      this.characterService.updateCharacterCount(res.length);
    });
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

}
