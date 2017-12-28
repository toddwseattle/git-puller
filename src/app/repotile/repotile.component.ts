import { Component, OnInit, Input } from '@angular/core';
import { IghOrg, IghRepo, IghRepoOwner } from '../core/ghobjects';

@Component({
  selector: 'app-repotile',
  templateUrl: './repotile.component.html',
  styleUrls: ['./repotile.component.css']
})
export class RepotileComponent implements OnInit {
  @Input() repo: IghRepo;

  constructor() { }

  ngOnInit() {
  }

}
