import { Component, OnInit } from '@angular/core';
import { BoardService } from './board.service';
import _ from 'lodash';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
    providers: [BoardService]
})
export class BoardComponent implements OnInit {
    public config: any;
    public rows = [];
    public cols = [];

    constructor(private boardService: BoardService) { }
    randomize() {
        this.boardService.randomise().subscribe(data => {
            this.updateData();
        });
    }
    ngOnInit() {
        this.updateData();
    }
    updateData() {
        let counter = 1;
        this.boardService.getGameConfig().subscribe(data => {
            this.config = data;

            for (let irow = 1; irow <= this.config.rows; irow++) {
                this.rows.push({});
            }

            for (let icol = 1; icol <= this.config.cols; icol++) {
                let matched = false;
                _.each(this.config.matchs, item => {
                    if (item === counter) {
                        matched = true;
                        return;
                    }
                });
                this.cols.push({ counter, matched });
                counter++;
            }
            console.log(this.cols, this.rows);
        });
    }
}
