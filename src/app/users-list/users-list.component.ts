import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

import {UsersApiService} from "./users-api.service";
import {UsersService} from "./users.service";
import {User} from "./user.model";
import {UserCardComponent} from "../user-card/user-card.component";
import {MatDividerModule} from "@angular/material/divider";

import {
  MatDialog
} from '@angular/material/dialog';
import {
  CreateEditUser
} from "../create-edit-user/create-edit-user";


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatDividerModule,
    MatButtonModule,
    UserCardComponent
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  users$: User[] = [];

  constructor() {
  }

  userApi: UsersApiService = inject(UsersApiService)
  usersService: UsersService = inject(UsersService)

  ngOnInit() {
    // @ts-ignore
    let localStorageUsers = JSON.parse(localStorage.getItem('storedUsers'));

    if (localStorageUsers) {
      this.usersService.getUsers(localStorageUsers);
    } else {
      this.userApi.loadUsers()
        .subscribe(
          (users) => {
            this.usersService.getUsers(users);
          }
        )
    }

    this.usersService.users$.subscribe(
      (users) => {
        this.users$ = users;
      }
    )
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id);
  }

  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(CreateEditUser, {
      data: {
        name: null,
        company: null,
        website: null,
        phone: null,
      },
    });
  }

  removeLocalStorage() {
    localStorage.removeItem('storedUsers');
    this.userApi.loadUsers()
      .subscribe(
        (users) => {
          this.usersService.getUsers(users);
        }
      )
  }
}
