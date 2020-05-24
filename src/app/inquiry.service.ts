import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })

export class InquiryService {
    constructor(private http: HttpClient) {}

    registerInquiry(email: string, name: string, message: string): Observable<any> {
        const body = { email, name, message };
        return this.http.post( `${environment.apiRoute}/messages.json`, {...body});
    }
}