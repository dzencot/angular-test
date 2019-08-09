import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import _ from 'lodash';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ],
})
export class TableComponent implements OnInit {
  columns = [
    {
      title: '#',
      name: 'number',
    },
    {
      title: 'Имя',
      name: 'name',
      type: 'text',
    },
    {
      title: 'Фамилия',
      name: 'lastName',
      type: 'text',
    }
  ];
  users = [];
  editUserId = '';
  checkoutForm;

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.usersService.getUsers()
      .subscribe(data => {
        console.log(data);
        if (!Array.isArray(data)) {
          return;
        }
        this.users =
          data.map(({ id, name, lastName }, index) => ({ id, name, lastName, number: index + 1 }));
      });

    const form = this.columns.reduce((carry, column) => {
      if (column.name !== 'number') {
        _.extend(carry, { [column.name]: '' });
      }
      return carry;
    }, {});
    console.log('form:');
    console.log(form);
    this.checkoutForm = this.formBuilder.group(form);
  }

  onChangeInput = (name, value, user) => {
    console.log('input:');
    console.log(name);
    console.log(value);
    user[name] = value;
    console.log(this.users);
  }

  onEdit({ id }) {
    console.log(`edit ${id}`);
    this.editUserId = id;
  }

  onDelete(user) {
    console.log('delte');
    this.usersService.deleteUser(user)
      .subscribe((data: any) => {
        const { id } = data;
        this.users = _.filter(this.users, item => item.id !== id);
        this.toastr.success('Пользователь удален', `Пользователь ${id} удален`);
      });
  }

  onSave(user) {
    console.log('edit save');
    console.log(user);
    this.usersService.editUser(user)
      .subscribe((data) => {
        console.log('response edit:');
        console.log(data);
        this.editUserId = '';
      });
  }

  onSubmit(userData) {
    this.usersService.addUser(userData)
      .subscribe(({ user }: any) => {
        console.log('new user data:');
        console.log(user);
        this.users.push(user);
        this.checkoutForm.reset();
      });
  }

  ngOnInit() {
  }

}
