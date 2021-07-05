import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services';

@Component({
  selector: 'posts-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  onLogout() {
    this.authService.logout();
  }
}
