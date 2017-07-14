import { async, inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  Http, HttpModule, XHRBackend, ResponseOptions,
  Response, BaseRequestOptions
} from '@angular/http';

import { BoardService } from './board.service';

describe('BoardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Http, useFactory: (backend, options) => {
            return new Http(backend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions,
        BoardService
      ]
    });
  });
  it('Verify Service Board Config Values', async(inject([BoardService, MockBackend],
    (service: BoardService, backend: MockBackend) => {

      backend.connections.subscribe((conn: MockConnection) => {
        const options: ResponseOptions = new ResponseOptions({ body: '{"id":"1","rows":4,"matchs":[3,4,5,7,9],"cols":4}' });
        conn.mockRespond(new Response(options));

      });

      service.getGameConfig().subscribe(
        value => {
          console.log('Return From Service Board Config Follow Value', value);
          expect(value).toBeDefined();
          expect(value.rows).toBeDefined();
          expect(value.cols).toBeDefined();
          expect(value.matchs).toBeDefined();
        },
        error => {
          console.log(error);
          expect(error).toBeNull();
        });
    })));
});
