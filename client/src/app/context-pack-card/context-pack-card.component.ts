import { Component, Input, OnInit } from '@angular/core';
import { CtxPk } from '../context-packs/context-pack';

@Component({
  selector: 'app-context-pack-card',
  templateUrl: './context-pack-card.component.html',
  styleUrls: ['./context-pack-card.component.scss']
})
export class ContextPackCardComponent implements OnInit {

  @Input() ctxPk: CtxPk;
  @Input() simple ? = false;

  constructor() { }

  ngOnInit(): void {
  }

}
