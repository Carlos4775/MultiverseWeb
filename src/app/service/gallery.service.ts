import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError as observableThrowError } from 'rxjs';
import { ImageGalleryVM } from '../interfaces/gallery.interface';

@Injectable({
    providedIn: 'root'
})
export class GalleryService {

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    public getList(): Observable<HttpResponse<any>> {
        return this.http.get<ImageGalleryVM[]>('assets/data/photos.json', { observe: 'response' }).pipe(catchError(this.handleError));
    }

    private handleError(err: HttpErrorResponse) {
        let error = err;
        return observableThrowError(() => new Error(error.message));
    }
}
