import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';

const serverUrl = 'http://localhost:8000';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
  ) { }

  getUsers() {
    const users = [
      {
        name: 'test',
        lastName: 'lastNametest',
        id: 1,
      },
      {
        name: 'test1',
        lastName: 'lastNametest1',
        id: 1,
      },
    ];
    return of(users);
    // return this.http.get(serverUrl);
  }

  deleteUser(user) {
    const { id } = user;
    return this.http.delete(`${serverUrl}/${id}`);
  }

  editUser(user) {
    const { id } = user;
    return this.http.patch(`${serverUrl}/${id}`, user, httpOptions);
  }

  addUser(user) {
    return this.http.post(`${serverUrl}`, user, httpOptions);
  }
}
