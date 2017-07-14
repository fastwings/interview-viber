import { IBoard } from './IBoard';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { RequestMethod, CommonServer } from './CommonService';

@Injectable()
export class BoardService extends CommonServer {
  private uri = environment.uri_address + 'Boards/';
  private randomiseObject = {
    "rows": 4,
    "cols": 4,
    "matchs": [
      3,
      4,
      5,
      7,
      9
    ]
  };
  constructor(public http: Http) {
    super(http);
  }
  getGameConfig() {
    const gameConfigId = environment.default_game_config_id;
    return this.Request(RequestMethod.GET, this.uri + '' + gameConfigId, {});
  }
  randomise() {
    const gameConfigId = environment.default_game_config_id;
    this.randomiseObject.rows = this.getRandomInt(3, 6);
    this.randomiseObject.cols = this.getRandomInt(3, 6);
    this.randomiseObject.matchs = [this.getRandomInt(1, 3), this.getRandomInt(4, 6), this.getRandomInt(6, 8), this.getRandomInt(9, 10)];
    return this.Request(RequestMethod.PUT, this.uri + '' + gameConfigId, this.randomiseObject);
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
