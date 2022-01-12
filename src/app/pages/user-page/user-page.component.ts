import { AuthService } from 'src/app/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { PasswordDialogComponent } from './password-dialog/password-dialog/password-dialog.component';
import { LoginResponse } from './../../shared/interfaces';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, AfterViewInit {
  user!: LoginResponse | null

  constructor(private dialog: MatDialog, public auth: AuthService) { }

  ngAfterViewInit(): void {
    let isActivated = this.auth.user$.value.isActivated
    console.log(isActivated);
      if (!isActivated) {  
        this.openDialog()
      }
  }

  ngOnInit(): void {
      this.user = JSON.parse(localStorage.getItem('user') as string)
  }

  openDialog() {
    const dialogRef = this.dialog.open(PasswordDialogComponent, {disableClose: true});

    dialogRef.afterClosed().pipe(
      switchMap(password => this.auth.changePassword(password))
    ).subscribe(result => {
      console.log(result);
    });
  }

}

