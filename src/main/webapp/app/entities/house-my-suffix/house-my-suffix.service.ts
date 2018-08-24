import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHouseMySuffix } from 'app/shared/model/house-my-suffix.model';

type EntityResponseType = HttpResponse<IHouseMySuffix>;
type EntityArrayResponseType = HttpResponse<IHouseMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class HouseMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/houses';

    constructor(private http: HttpClient) {}

    create(house: IHouseMySuffix): Observable<EntityResponseType> {
        return this.http.post<IHouseMySuffix>(this.resourceUrl, house, { observe: 'response' });
    }

    update(house: IHouseMySuffix): Observable<EntityResponseType> {
        return this.http.put<IHouseMySuffix>(this.resourceUrl, house, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IHouseMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHouseMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
