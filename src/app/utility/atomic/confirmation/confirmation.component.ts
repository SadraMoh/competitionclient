import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  @ViewChild('modal')
  modal!: ModalComponent;

  title?: string;

  text?: string;

  resultEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  result!: Promise<boolean>;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.registerConfirmModalComponent(this);
  }

  confirm(title: string, text: string): Promise<boolean> {

    this.result = new Promise((res, rej) => {
      this.resultEmitter.subscribe((i: boolean) => res(i));
    });

    this.title = title;
    this.text = text;
    this.modal.show();
    return this.result;
  }

  accept() {
    this.resultEmitter.emit(true);
    this.modal.hide();
  }

  cancel() {
    this.resultEmitter.emit(false);
  }

}
