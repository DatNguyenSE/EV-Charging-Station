import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../_models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  
  baseUrl = 'https://localhost:5001/api/';
  currentUser = signal<User | null>(null);

  login(creds: any) {
    return this.http.post<User>(this.baseUrl+'account/login',creds).pipe(        //.pipe(...): Cho phép bạn xử lý dữ liệu trả về trước khi gửi ra ngoài.
      map(user => {                                                           //map() dùng để biến đổi dữ liệu.
        if(user) {
          localStorage.setItem("user", JSON.stringify(user));               // đổi về dạng object -> txtjson sau đó muốn lấy thì JSON.parse(localStorage.getItem("user")) 
          this.currentUser.set(user);
        }
      })
    )
  }
  
   register(creds: any) {
    return this.http.post<User>(this.baseUrl+'account/register',creds).pipe( //.pipe(...): Cho phép bạn xử lý dữ liệu trả về trước khi gửi ra ngoài.
      map(user => {                                                     //map() dùng để biến đổi dữ liệu.
        if(user) {
          localStorage.setItem("user", JSON.stringify(user)); // đổi về dạng object -> txtjson sau đó muốn lấy thì JSON.parse(localStorage.getItem("user")) 
          this.currentUser.set(user);
        }
        return user;
      })
    )
  }

  logout() {
    localStorage.removeItem("user");
    this.currentUser.set(null);
  }

}
