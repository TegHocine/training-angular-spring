import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { CreateProduct, Product } from '../types/product.type';

type Products = Product[];

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly url = '/api/v1/products';
  public _products: ReplaySubject<Products> = new ReplaySubject<Products>(1);

  constructor(private http: HttpClient) {}

  get collaborators$(): Observable<Products> {
    return this._products.asObservable();
  }

  get(): Observable<Products> {
    return this.http.get<Products>(this.url).pipe(
      tap((collaborators: Products) => {
        this._products.next(collaborators);
      })
    );
  }

  add(product: CreateProduct): Observable<CreateProduct> {
    return this.http.post<CreateProduct>(this.url, product).pipe<CreateProduct>(
      tap(() => {
        this.get().subscribe();
      })
    );
  }

  update(updateProduct: CreateProduct): Observable<CreateProduct> {
    return this.http
      .put<CreateProduct>(`${this.url}/${updateProduct.id}`, updateProduct)
      .pipe<CreateProduct>(
        tap(() => {
          this.get().subscribe();
        })
      );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe<void>(
      tap(() => {
        this.get().subscribe();
      })
    );
  }
}
