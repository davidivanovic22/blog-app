import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../core/login/login.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  currentUser!: User;
  user!: User;

  constructor(
    private readonly authService: AuthService,
    private readonly observer: BreakpointObserver,
    private dialog: MatDialog,
    private router: Router,

    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => {
      this.currentUser = x;
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      }
    });

    this.router.events.subscribe(() => {
      if (this.sidenav?.mode === 'over') {
        this.sidenav.close();
      }
    });
  }

  logout() {
    this.authService.logout();
  }
  login() {
    this.dialog.open(LoginComponent, {
      panelClass: 'nopadding-dialog'
    });
  }
}
