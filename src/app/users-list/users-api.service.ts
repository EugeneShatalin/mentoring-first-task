import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./user.model";

@Injectable({
  providedIn: 'root'
})

export class UsersApiService {

  constructor(private httpClient: HttpClient) {
  }

  loadUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('https://jsonplaceholder.typicode.com/users')
  }
}
