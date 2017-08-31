import {Component, OnInit} from '@angular/core';
import {Transastion} from "../../model/transaction.model";
import {TransactionService} from "../../service/transaction.service";
import {Tag} from "../../model/tag.model";

@Component({
  selector: 'app-fast-expence',
  templateUrl: './fast-expence.component.html',
  styleUrls: ['./fast-expence.component.scss']
})
export class FastExpenceComponent implements OnInit {

  tagsAsString: string;
  transaction: Transastion = new Transastion();

  constructor(private service: TransactionService) {
  }

  ngOnInit() {
  }

  createTransaction() {
    const self = this;

    this.transaction.tags = this.tagsAsString
      .split(',')
      .map(v => v.trim())
      .map(v => new Tag(v));

    this.service.createTransaction(this.transaction).subscribe(
      success => this.resetTransaction.bind(self),
      error => console.log(error.json())
    );
  }

  private resetTransaction() {
    this.transaction = new Transastion();
    this.tagsAsString = '';
  }

}
