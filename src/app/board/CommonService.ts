import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
export enum RequestMethod {
    GET,
    POST,
    PUT,
    DELETE
}
export abstract class CommonServer {
    constructor(public http: Http) { }

    protected Request(method: RequestMethod, uri: string, data: any) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers });
        switch (method) {
            case RequestMethod.GET:
                console.log('Requesting Data', 'GET', uri, data);
                return this.http.get(uri, options).map(res => {
                    console.log(res.json(), res.text());
                    return JSON.parse(res.text());
                }).catch(this.handleError);
            case RequestMethod.PUT:
                console.log('Requesting Data', 'PUT', uri, data);
                return this.http.put(uri, data, options).map(res => {
                    console.log(res.json(), res.text());
                    return JSON.parse(res.text());
                }).catch(this.handleError);
            case RequestMethod.POST:
                console.log('Requesting Data', 'POST', uri, data);
                return this.http.post(uri, data, options).map(res => {
                    console.log(res.json(), res.text());
                    return JSON.parse(res.text());
                }).catch(this.handleError);
            case RequestMethod.DELETE:
                console.log('Requesting Data', 'DELETE', uri, data);
                return this.http.delete(uri, options).map(res => {
                    console.log(res.json(), res.text());
                    return JSON.parse(res.text());
                }).catch(this.handleError);
        }
    }

    private handleError(error: Response | any) {
        console.error('Found Error', error);
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}