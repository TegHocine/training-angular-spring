import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { CreateProduct, Product } from '../types/product.type';

type Products = Product[];

type GetProps = {
  name?: string;
  category?: number;
  priceRange: [number, number];
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly url = '/api/v1/products';
  public _products: ReplaySubject<Products> = new ReplaySubject<Products>(1);
  private params = new HttpParams();

  constructor(private http: HttpClient) {}

  get collaborators$(): Observable<Products> {
    return this._products.asObservable();
  }

  setParams(params: GetProps): void {
    this.params = new HttpParams();
    this.params = this.params.set('name', params?.name || '');
    this.params = this.params.set(
      'category',
      params?.category?.toString() || ''
    );
    this.params = this.params.set('minPrice', params.priceRange[0].toString());
    this.params = this.params.set('maxPrice', params.priceRange[1].toString());

    this.get().subscribe();
  }

  get(): Observable<Products> {
    return this.http.get<Products>(this.url, { params: this.params }).pipe(
      tap((products: Products) => {
        this._products.next(products);
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
