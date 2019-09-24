import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SalesService {
  constructor(private httpClient: HttpClient) {}
  users = [];

  getStoreData() {
    return this.httpClient.get("http://localhost:8000/user-shop/").pipe(
      map((res: any) => res),
      catchError((error: any) => Observable.throw(error || "Server error"))
    );
  }

  genratebill() {
    return this.httpClient.get("http://localhost:8000/api/generate-bill/").pipe(
      map((res: any) => res),
      catchError((error: any) => Observable.throw(error || "Server error"))
    );
  }

  getShops() {
    return this.httpClient.get("http://localhost:8000/shops-list/").pipe(
      map((res: any) => res),
      catchError((error: any) => Observable.throw(error || "Server error"))
    );
  }

  reportGenrateCash(date,id) {
    return this.httpClient.get(`http://localhost:8000/api/get-cash-reports/${date}/${id}/`).pipe(
      map((res: any) => res),
      catchError((error: any) => Observable.throw(error || "Server error"))
    );
  }

  reportGenratePos(date,id) {
    return this.httpClient.get(`http://localhost:8000/api/get-pos-reports/${date}/${id}/`).pipe(
      map((res: any) => res),
      catchError((error: any) => Observable.throw(error || "Server error"))
    );
  }
}
