import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StudentDetailsService {

  private actionUrl: string;
  constructor(private http: HttpClient) {
    this.actionUrl = 'http://localhost:8000';
  }

  public saveStudentDetails<T>(data): Observable<T> {
    return this.http.post<T>(this.actionUrl + '/updateScore', data);
  }

  public getChartDetails<T>(): Observable<T> {
    return this.http.get<T>(this.actionUrl + `/getStudentList`);
  }

  public getStudentDetails<T>(name): Observable<T> {
    return this.http.get<T>(this.actionUrl + `/getStudentRecord?name=${name}`);
  }
}

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        return next.handle(req);
    }
}
