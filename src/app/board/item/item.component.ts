import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition,group } from '@angular/animations';
@Component({
    selector: 'app-board-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
    animations: [
        trigger('myAnimation', [
            state('idle', style({ transform: 'rotateY(0deg)',opacity: 1})),
            state('flip', style({ transform: 'rotateY(180deg)',opacity: 0.75 })),
            state('marked', style({ transform: 'rotateY(0deg)',opacity: 0.65 ,background: 'rgb(0, 0, 0)' })),
            transition('idle => flip' ,group([
                animate('3s ease', style({
                    transform: 'rotateY(180deg)',
                })),  
                animate('3s ease') , style({
                    opacity: 0.75
                })
            ])),
            transition('flip => idle' ,group([
                animate('2.5s ease', style({
                    transform: 'rotateY(0deg)',
                })),  
                animate('2.5s ease') , style({
                    opacity: 1
                })
            ])),
            transition('flip => marked' ,group([
                animate('2.5s ease', style({
                    transform: 'rotateY(0deg)',
                })),  
                animate('2.5s ease') , style({
                    opacity: 0.65
                }),  
                animate('0.3s 2.2s ease') , style({
                    background: 'rgb(0, 0, 0)'
                })
            ]))
        ])
    ]
})
export class ItemComponent implements OnInit {
    @Input()
    private matched;
    public cellState = false;
    public cellStateText = "Click Me!!";
    animationState = 'idle'
    constructor() { }

    ngOnInit() {
        this.matched = this.convertToBoolean(this.matched);
    }
    onCellChange() {
        this.animationState = 'flip';
        if (!this.cellState) {
            this.cellStateText = "Meh";
            if (this.matched) {
                this.cellStateText = "Boom";
            }
            this.cellState = true;
        }
        else {
            alert("Wont Change Status");
        }
    }
    animationDone($event) {
        if (this.animationState === 'flip') {
            this.animationState = 'marked';
        }
    }
    convertToBoolean(input: string): boolean | undefined {
        try {
            return JSON.parse(input);
        }
        catch (e) {
            return undefined;
        }
    }

}
