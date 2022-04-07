import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  baseUrl = environment.baseUrl;
  constructor(  private http: HttpClient,private router: Router,) { 
  }
  isLogin() {
    const islogin = sessionStorage.getItem("login");
    if (islogin === "true") {
      return true;
    } else {
      this.router.navigateByUrl("/login");
      return false;
    }
  }
  onLogout() {
    sessionStorage.clear();
  }

  // get random beer
  getRandomBeer(): Observable<any> {
    return <Observable<any>>(
      this.http.get(this.baseUrl + "beers/random"));
  }

  // get single beer based on parameters
  getSingleBeer(beer_name:any):Observable<any> {
    return <Observable<any>>(
      this.http.get(this.baseUrl + "beers?"+"beer_name="+beer_name));
}

// get Non Alchoholic beer
getNonbeer(abv_lt:number){
  return <Observable<any>>(
    this.http.get(this.baseUrl + "beers?"+"abv_lt="+abv_lt));
}
}
