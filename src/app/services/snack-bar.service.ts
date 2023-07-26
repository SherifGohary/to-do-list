import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  success(message: string){
    this.snackBar.open(message, "Close", {
      duration: 5000,
      panelClass: ['snackbar-success']
    });
  }

  error(message: string){
    this.snackBar.open(message, "Close", {
      duration: 5000,
      panelClass: ['snackbar-error']
    });
  }
}
