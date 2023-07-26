import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToDoService } from '../../services/to-do.service';
import { SnackBarService } from '../../services/snack-bar.service';


@Component({
  selector: 'app-to-do-item-form',
  templateUrl: './to-do-item-form.component.html',
  styleUrls: ['./to-do-item-form.component.scss']
})
export class ToDoItemFormComponent implements OnInit {

  form: any = null;

  @Input() item: any;

  @Output()
  onSave!: EventEmitter<any>;

  constructor(private modalService: NgbModal,
    private toDoService: ToDoService,
    private snackBar: SnackBarService,
    public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  onSubmit(event: any, todoForm: any) {
    this.form = todoForm;
    console.log("event", event);
    console.log("todoForm", todoForm);
    console.log(this.item);
    if (todoForm.valid) {
      if (this.item.id > 0) {
        this.toDoService.editToDoItem(this.item).subscribe(response => {
          console.log("response", response);
          this.onSave.emit(response);
          this.activeModal.dismiss('Modal closed');
          this.snackBar.success("ToDo Updated Successfully.");
        }, errorResponse => {
          this.snackBar.error(errorResponse.error.message);
          console.log(errorResponse);
        });
      }
      else {
        this.toDoService.addNewToDoItem(this.item).subscribe(response => {
          console.log("response", response);
          this.onSave.emit(response);
          this.activeModal.dismiss('Modal closed');
          this.snackBar.success("ToDo Created Successfully.");
        }, errorResponse => {
          this.snackBar.error(errorResponse.error.message);
          console.log(errorResponse);
        });
      }
    }

  }

}
