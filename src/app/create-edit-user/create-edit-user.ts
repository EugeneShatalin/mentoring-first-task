import {ChangeDetectionStrategy, Component, inject, Inject, Input, OnInit} from '@angular/core';
import {Form, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {UsersService} from "../users-list/users.service";

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule],
  templateUrl: './create-edit-user.html',
  styleUrl: './create-edit-user.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEditUser {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  userService = inject(UsersService);

  profileForm = new FormGroup({
    name: new FormControl(this.data.name, [Validators.required]),
    company: new FormControl(this.data.company, [Validators.required]),
    website: new FormControl(this.data.website, [Validators.required]),
    phone: new FormControl(this.data.phone, [Validators.required]),
  })

  updateUser() {
    if (this.data.id) {
      this.userService.updateUser(this.data.id, this.profileForm.value);
      return
    }
    this.userService.addUser(this.profileForm.value)
  }
}
