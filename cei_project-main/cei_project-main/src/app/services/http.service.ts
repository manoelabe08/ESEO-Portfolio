import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
}) 
export class HttpService {

  constructor(private http: HttpClient) { }

  postWithProgress(url: string, body: any): Observable<{ progress: number; response?: any }> {
    const req = new HttpRequest('POST', url, body, {
      reportProgress: true, // Enable progress tracking
    });

    return this.http.request(req).pipe(
      map((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            // Calculate upload progress
            const progress = Math.round((event.loaded / (event.total || 1)) * 100);
            return { progress };

          case HttpEventType.Response:
            // Return the response when the request is complete
            return { progress: 100, response: event.body };

          default:
            return { progress: 0 };
        }
      }),
    );
  }
  
}