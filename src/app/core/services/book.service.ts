import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base-http.service';
import { API_ENDPOINTS } from '../constants/api-endpoints.constants';

export interface Book {
  id: string;
  title: string;
  description: string;
  author?: string;
  coverImage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private baseHttp: BaseHttpService) {}

  getRecentlyViewedBooks(): Observable<Book[]> {
    return this.baseHttp.get<Book[]>(API_ENDPOINTS.BOOKS.GET_ALL);
  }
}