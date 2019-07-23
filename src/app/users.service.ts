import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    return this.http.get(serverUrl);
  }

  deleteUser(user) {
    const { id } = user;
    return this.http.delete(`${serverUrl}/${id}`);
  }

  editUser(user) {
    const { id } = user;
    return this.http.put(`${serverUrl}/${id}`, user, httpOptions);
  }

  addUser(user) {
    return this.http.post(`${serverUrl}`, user, httpOptions);
  }
}
