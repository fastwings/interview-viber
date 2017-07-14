import { async, inject, TestBed, ComponentFixture } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  Http, HttpModule, XHRBackend, ResponseOptions,
  Response, BaseRequestOptions
} from '@angular/http';

import { BoardService } from './board.service';
import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardComponent],
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
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be have data', async(inject([BoardService, MockBackend],
    (service: BoardService, backend: MockBackend) => {

      backend.connections.subscribe((conn: MockConnection) => {
        const options: ResponseOptions = new ResponseOptions({ body: '{"id":"1","rows":4,"matchs":[3,4,5,7,9],"cols":4}' });
        conn.mockRespond(new Response(options));

      });

      service.getGameConfig().subscribe(
        value => {

          fixture.whenStable().then(() => { // wait for async getQuote
            console.log('Return From Service Board Config Follow Value', value);
            expect(value).toBeDefined();
            expect(component.config).toBeDefined();
            expect(value.rows).toBeDefined();
            expect(value.cols).toBeDefined();
            expect(value.matchs).toBeDefined();
            expect(component.config.rows).toBeDefined();
            expect(component.config.cols).toBeDefined();
            expect(component.config.matchs).toBeDefined();
            expect(component.config.rows).toEqual(value.rows);
            expect(component.config.cols).toEqual(value.cols);
            expect(component.config.matchs).toEqual(value.matchs);
          },
            error => {
              console.log(error);
              expect(error).toBeNull();
            });
        });
    })));
});
