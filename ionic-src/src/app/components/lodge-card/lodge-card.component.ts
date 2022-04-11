import { MountainLodge } from './../../models/mountainLodge.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lodge-card',
  templateUrl: './lodge-card.component.html',
  styleUrls: ['./lodge-card.component.scss'],
})
export class LodgeCardComponent implements OnInit {

  @Input()
  mountainLodge: MountainLodge;

  constructor() { }

  ngOnInit() { }

}
