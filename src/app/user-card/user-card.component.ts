import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {User} from "../users-list/user.model";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {CreateEditUser} from "../create-edit-user/create-edit-user";

import {
  MatDialog,
} from '@angular/material/dialog';
import {UsersService} from "../users-list/users.service";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() onDeleteUser = new EventEmitter<number>();

  constructor() {
  }

  readonly dialog = inject(MatDialog);
  readonly userService = inject(UsersService);

  openDialog() {
    this.dialog.open(CreateEditUser, {
      data: {
        id: this.user.id,
        name: this.user.username,
        company: this.user.company?.name,
        website: this.user.website,
        phone: this.user.phone,
      },
    });
    console.log('this.user.id ' + this.user.id)
  }

  deleteUser() {
    this.onDeleteUser.emit(this.user.id)
  }

}
