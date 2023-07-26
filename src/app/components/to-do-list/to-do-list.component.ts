import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToDoService } from '../../services/to-do.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToDoItemFormComponent } from '../to-do-item-form/to-do-item-form.component';
import { faPlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {

  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();

  toDoList: any[] = [];
  itemToAddOrEdit: any;
  faPlus = faPlus;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;

  constructor(
    private toDoService: ToDoService,
    private router: Router,
    private modalService: NgbModal,
    private snackBar: SnackBarService
  ) {

    this.onSave.subscribe(event => {
      let existingItem = this.toDoList.find(i => i.id === event.id);
      if (!existingItem) this.toDoList = [event, ...this.toDoList];
      else {
        existingItem.completed = event.completed;
        existingItem.todo = event.todo;
      }
      this.itemToAddOrEdit = this.getEmptyTodoItem();
    });

  }

  ngOnInit(): void {
    this.getToDoList();
    this.itemToAddOrEdit = this.getEmptyTodoItem();
  }

  getEmptyTodoItem() {
    return {
      id: 0,
      completed: false,
      todo: '',
      userId: 1
    }
  }

  getToDoList(): void {
    this.toDoService.getAllToDoList().subscribe(response => {
      this.toDoList = (response as any)["todos"];
      console.log("this.toDoList", this.toDoList);
    });
  }

  editItem(item: any) {
    // this.itemToAddOrEdit = item;
    this.openModal({ ...item });
    // console.log("activeInstances", this.modalService.activeInstances);
  }

  deleteItem(item: any) {
    this.toDoService.deleteTodoItem(item.id).subscribe(response => {
      this.toDoList = this.toDoList.filter(i => i.id !== (response as any).id);
      console.log("this.toDoList", this.toDoList);
      this.snackBar.success("ToDo Deleted Successfully.");
    }, errorResponse => {
      this.snackBar.error(errorResponse.error.message);
      console.log(errorResponse);
    });
  }

  openModal(item: any) {
    const modalRef = this.modalService.open(ToDoItemFormComponent);
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.onSave = this.onSave;

    modalRef.result.then(
      (result) => {
        console.log('Modal closed with result:', result);
      },
      (reason) => {
        console.log('Modal dismissed with reason:', reason);
      }
    );
  }

  markCompleted(item: any) {
    item.completed = true;
    this.toDoService.editToDoItem({ ...item }).subscribe(response => {
      console.log("response", response);
      this.onSave.emit(response);
    }, errorResponse => {
      this.snackBar.error(errorResponse.error.message);
      console.log(errorResponse);
    });
  }

  markIncompleted(item: any) {
    item.completed = false;
    this.toDoService.editToDoItem({ ...item }).subscribe(response => {
      console.log("response", response);
      this.onSave.emit(response);
    }, errorResponse => {
      this.snackBar.error(errorResponse.error.message);
      console.log(errorResponse);
    });
  }

}
