import {Component, OnInit} from '@angular/core';
import {Transaction} from "../../model/transaction.model";
import {TransactionService} from "../../service/transaction.service";
import {Tag} from "../../model/tag.model";

@Component({
  selector: 'app-fast-expence',
  templateUrl: './fast-expence.component.html',
  styleUrls: ['./fast-expence.component.scss']
})
export class FastExpenceComponent implements OnInit {

  tagsAsString: string;
  transaction: Transaction = new Transaction();

  constructor(private service: TransactionService) {
  }

  ngOnInit() {
  }

  createTransaction() {
    this.transaction.tags = this.tagsAsString
      .split(',')
      .map(v => v.trim().toLowerCase())
      .map(v => new Tag(v));

    this.service.createTransaction(this.transaction).subscribe(
      success => this.resetTransaction(),
      error => console.log(error.json())
    );
  }

  resetTransaction() {
    this.transaction = new Transaction();
    this.tagsAsString = '';
  }

}
