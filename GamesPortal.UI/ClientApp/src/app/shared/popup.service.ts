import { Injectable } from '@angular/core';
import { ModalService } from 'angular-5-popup';

@Injectable()
export class PopupService {

  constructor(private modalService: ModalService) { }

  openModal(id) {
    this.modalService.open(id);
  }

  closeModal(id) {
    this.modalService.close(id);
  }

}
