import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Category } from '../types/category.type';

type Categories = Category[];

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  readonly url = '/api/v1/categories';
  public _categories: ReplaySubject<Categories> = new ReplaySubject<Categories>(
    1
  );

  constructor(private http: HttpClient) {}

  get categories$(): Observable<Categories> {
    return this._categories.asObservable();
  }

  get(): Observable<Categories> {
    return this.http.get<Categories>(this.url).pipe(
      tap((collaborators: Categories) => {
        this._categories.next(collaborators);
      })
    );
  }
}
