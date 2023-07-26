import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  baseURL: string = "https://dummyjson.com"

  constructor(private httpService: HttpService) { }

  getAllToDoList() {
    return this.httpService.get(this.baseURL + "/todos");
  }

  addNewToDoItem(item: any) {
    return this.httpService.post(this.baseURL + "/todos/add", item);
  }

  editToDoItem(item: any) {
    const data = { 
      completed: item.completed,
      todo: item.todo
    };
    return this.httpService.put(this.baseURL + "/todos/" + item.id, data);
  }

  deleteTodoItem(id: any){
    return this.httpService.delete(this.baseURL + "/todos/" + id);
  }
}
