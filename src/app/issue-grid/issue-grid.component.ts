import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IghIssue } from '../core/ghobjects';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatSort } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-issue-grid',
  templateUrl: './issue-grid.component.html',
  styleUrls: ['./issue-grid.component.css']
})
export class IssueGridComponent implements OnInit {
  @Input() issues: IghIssue[];
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = [ 'createdAt', 'openedBy',  'title',  'assignee'];
  issueDatabase: IssueDatabase;
  dataSource: IssueDataSource | null;

  constructor() {

   }

  ngOnInit() {
    this.issueDatabase = new IssueDatabase(this.issues);
    this.dataSource = new IssueDataSource(this.issueDatabase, this.sort);
  }

}

export class IssueDatabase {
  dataChange: BehaviorSubject<IghIssue[]> = new BehaviorSubject<IghIssue[]>([]);
  get data(): IghIssue[] { return this.dataChange.value; }

  constructor(issues?: IghIssue[]) {
    if (issues) {
      this.dataChange.next(issues);
    }
   }
}


export class IssueDataSource extends DataSource<any> {
  constructor(private _issueDatabase: IssueDatabase, private _sort: MatSort) {
    super();
  }

  connect(): Observable<IghIssue[]> {
    const displayDataChanges = [
      this._issueDatabase.dataChange,
      this._sort.sortChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this.getSortedData();
    });
  }

  disconnect() {}

  getSortedData(): IghIssue[] {
    const data = this._issueDatabase.data.slice();
    if (!this._sort.active || this._sort.direction === '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'assignee': [propertyA, propertyB] =
         [a.assignee != null ? a.assignee.login : null  ,
           b.assignee != null ? b.assignee.login : null];
         break;
        case 'openedBy': [propertyA, propertyB] = [a.user.login, b.user.login]; break;
        case 'title': [propertyA, propertyB] = [a.title.toUpperCase(), b.title.toUpperCase()]; break;
        case 'createdAt': [propertyA, propertyB] = [(new Date(a.created_at)).getTime(), (new Date(b.created_at)).getTime()]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}
