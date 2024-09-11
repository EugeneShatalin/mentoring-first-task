import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
import {User} from "./user.model";

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private userSubject = new BehaviorSubject<User[]>([]);
  public readonly users$ = this.userSubject.asObservable();

  getUsers(users: User[]) {
    localStorage.setItem('storedUsers', JSON.stringify(users));
    this.userSubject.next([...users]);
  }

  deleteUser(id: number) {
    this.userSubject.next(this.userSubject.value.filter(user => user.id !== id));
    localStorage.setItem('storedUsers', JSON.stringify(this.userSubject.value));
    // @ts-ignore
    let usersPP = JSON.parse(localStorage.getItem('storedUsers'))
    console.log('UserPP ' + usersPP)
  }

  updateUser(userId: number, userNewData: any) {

    let updatedArr = this.userSubject.value
      .map(user => {
        if (user.id === userId) {
          let newUser = {
            ...user,
            username: userNewData.name,
            website: userNewData.website,
            phone: userNewData.phone,
            company: {...user.company, name: userNewData.company}
          }
          return newUser;
        } else {
          return user;
        }
      });
    this.userSubject.next([...updatedArr]);
    localStorage.setItem('storedUsers', JSON.stringify(this.userSubject.value));
  }

  addUser (userNewData: any) {
    let newUser = {
      id: Number(new Date()),
      name: 'string',
      username: userNewData.name,
      email: 'string',
      address: {
        street: 'string',
        suite: 'string',
        city: 'string',
        zipcode: 'string',
        geo: {
          lat: 'string',
          lng: 'string'
        }
      },
      phone: userNewData.phone,
      website: userNewData.website,
      company: {
        name: userNewData.company,
        catchPhrase: 'string',
        bs: 'string'
      }
    }
    let updatedArr = this.userSubject.value;
    updatedArr.unshift(newUser);
    this.userSubject.next([...updatedArr]);
    localStorage.setItem('storedUsers', JSON.stringify(this.userSubject.value));
  }

}
