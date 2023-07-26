import { Component, OnInit, ContentChild, TemplateRef, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-basic',
  templateUrl: './modal-basic.component.html',
  styleUrls: ['./modal-basic.component.scss']
})
export class ModalBasicComponent implements OnInit {

  @Input() title : string = 'Hello';
  @Input() form : any;
  
  closeResult: string = '';

  @ContentChild(TemplateRef)
  template!: TemplateRef<any>;
  
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
  }

  closeModal() {
    this.activeModal.dismiss('Modal closed');
  }

  // open(content:any) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
  
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }
  
}
