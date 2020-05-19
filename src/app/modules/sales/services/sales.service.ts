import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpService } from "src/app/shared/services/http.service";

@Injectable({
  providedIn: "root"
})
export class SalesService {
  constructor(
    private httpClient: HttpClient,
    private httpService: HttpService
  ) {}
  users = [];

  getStoreData() {
    return this.httpService.get("/user-shop/").pipe(
      map((res: any) => res),
      catchError((error: any) => throwError(error || "Server error"))
    );
  }

  salesDataAvailable(date, shop) {
    return this.httpService
      .get(`/sales-data-available/${date}/${shop}/`)
      .pipe(
        map((res: any) => {
          return null;
        }),
        catchError((error: any) => throwError(error || "Server error"))
      );
  }

  getShops() {
    return this.httpService.get("/shops-list/").pipe(
      map((res: any) => res),
      catchError((error: any) => throwError(error || "Server error"))
    );
  }

  reportGenrateCash(date, id) {
    return this.httpService.get(`/get-cash-reports/${date}/${id}/`).pipe(
      map((res: any) => res),
      catchError((error: any) => throwError(error || "Server error"))
    );
  }

  reportGenratePos(date, id) {
    return this.httpService.get(`/get-pos-reports/${date}/${id}/`).pipe(
      map((res: any) => res),
      catchError((error: any) => throwError(error || "Server error"))
    );
  }

  getCategoryList(data) {
    return this.httpService
      .get(`/shop-categories/${data.shop}/${data.date}/`)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => throwError(error || "Server error"))
      );
  }

  getLiquorList(data) {
    return this.httpService
      .get(
        `/shop-liquors/${data.shop}/${data.date}/${data.category}/`
      )
      .pipe(
        map((res: any) => res),
        catchError((error: any) => throwError(error || "Server error"))
      );
  }

  saveTableData(data) {
    const fd = {
      sales: JSON.stringify([...data])
    };
    return this.httpService.post(`/add-sales/`, fd).pipe(
      map((res: any) => res),
      catchError((error: any) => throwError(error || "Server error"))
    );
  }

  updateSalesdata(data, shopliquor, details) {
    return this.httpService
      .patch(`/update-sales-data/${data.date}/${shopliquor}/`, details)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => throwError(error || "Server error"))
      );
  }

  getInvoiceData(date, shop) {
    // console.log("sdfdsfds", date, shop);
    return this.httpService.get(`/bill-format/${date}/${shop}/`).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: any) => throwError(error || "Server error"))
    );
  }

  getFirstDate() {
    return this.httpService.get(`/first-date-salesdata/`).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: any) => throwError(error || "Server error"))
    );
  }
  // return of(true);
}
