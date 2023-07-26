import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalBasicComponent } from './components/modal-basic/modal-basic.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToDoItemFormComponent } from './components/to-do-item-form/to-do-item-form.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    ModalBasicComponent,
    ToDoItemFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    MatSnackBarModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
