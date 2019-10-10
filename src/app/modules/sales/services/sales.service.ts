import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
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

  genratebill(shop,date) {
    return this.httpClient.get(`http://localhost:8000/api/export/${shop}/${date}/`).pipe(
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

  reportGenrateCash(date, id) {
    return this.httpClient
      .get(`http://localhost:8000/api/get-cash-reports/${date}/${id}/`)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => Observable.throw(error || "Server error"))
      );
  }

  reportGenratePos(date, id) {
    return this.httpClient
      .get(`http://localhost:8000/api/get-pos-reports/${date}/${id}/`)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => Observable.throw(error || "Server error"))
      );
  }

  getCategoryList(data) {
    return this.httpClient
      .get(`http://localhost:8000/shop-categories/${data.shop}/${data.date}/`)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => Observable.throw(error || "Server error"))
      );
  }

  getLiquorList(data) {
    return this.httpClient
      .get(
        ` http://localhost:8000/api/liquors_categories1/${data.shop}/${data.date}/${data.category}/`
      )
      .pipe(
        map((res: any) => res),
        catchError((error: any) => Observable.throw(error || "Server error"))
      );
  }

  saveTableData(data) {
    const fd = {
      sales: JSON.stringify([...data])
    };
    return this.httpClient
      .post(`http://localhost:8000/api/sales-data/`, fd)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => {
          return throwError(error || "Server error");
        })
      );
  }
}
