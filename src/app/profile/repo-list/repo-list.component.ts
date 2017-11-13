import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { IghOrg, IghRepo } from '../../core/ghobjects';
import { IUser, IGHUser } from '../../core/user';

import { DataSource } from '@angular/cdk/collections';
import { MatTable, MatSort } from '@angular/material';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css']
})

export class RepoListComponent implements OnInit {
  @Input() Repos: Observable<IghRepo[]>;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['loginOrOrg', 'repoName', 'repoDescription',
                      'repoIssues', 'repoSize', 'repoUpdated'];
  repoDatabase: RepoDatabase;
  dataSource: RepoDataSource | null;
  private _reposSub: Subscription;
  constructor() {
  }

  ngOnInit() {
    this._reposSub = this.Repos.subscribe( rs => {
      this.repoDatabase = new RepoDatabase(rs);
      this.dataSource = new RepoDataSource(this.repoDatabase, this.sort);
    });

  }

}
// see example: https://material.angular.io/components/table/overview
export class RepoDatabase {
  dataChange: BehaviorSubject<IghRepo[]> = new BehaviorSubject<IghRepo[]>([]);
  get data(): IghRepo[] { return this.dataChange.value; }

  constructor(repos?: IghRepo[]) {
    if (repos) {
      this.dataChange.next(repos);
    }
   }
}

export class RepoDataSource extends DataSource<any> {
  constructor(private _repoDatabase: RepoDatabase, private _sort: MatSort) {
    super();
  }

  connect(): Observable<IghRepo[]> {
    const displayDataChanges = [
      this._repoDatabase.dataChange,
      this._sort.sortChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this.getSortedData();
    });
  }

  disconnect() {}

  getSortedData(): IghRepo[] {
    const data = this._repoDatabase.data.slice();
    if (!this._sort.active || this._sort.direction === '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'loginOrOrg': [propertyA, propertyB] = [a.owner.login, b.owner.login]; break;
        case 'repoName': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'repoIssues': [propertyA, propertyB] = [a.open_issues_count, b.open_issues_count]; break;
        case 'repoSize': [propertyA, propertyB] = [a.size, b.size]; break;
        case 'repoUpaated': [propertyA, propertyB] = [a.updated_at, b.updated_at]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}
