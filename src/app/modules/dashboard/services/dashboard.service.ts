import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DashboardService {
  constructor(private httpClient: HttpClient) {}
  users = [];

  getShopsData() {
    return this.httpClient.get("http://localhost:8000/shops-list/").pipe(
      map((res: any) => res),
      catchError((error: any) => Observable.throw(error || "Server error"))
    );
  }
}
