import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new UntypedFormGroup({
    username: new UntypedFormControl(null, Validators.required),
    password: new UntypedFormControl(null, Validators.required),
  });
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {
    if (data) {
      this.loginForm.controls['username'].setValue(data.username);
    }
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    if (
      this.authService.login(
        this.loginForm.get('username')!.value,
        this.loginForm.get('password')!.value
      )
    ) {
      this.router.navigate(['/home']);
      this.dialogRef.close();
    } else {
      this.loading = false;
      this.snackbar.open('Username or password is not correct', "Close")
    }
  }
}
