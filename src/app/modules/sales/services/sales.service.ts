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
}
