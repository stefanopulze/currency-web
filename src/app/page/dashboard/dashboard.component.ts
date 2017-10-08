import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ExpenceService} from '../../service/expence.service';
import {Transaction} from '../../model/transaction.model';
import {TagService} from '../../service/tag.service';
import Chart from 'Chart.js';
import {ExpencePanelComponent} from "../../ui/expence-panel/expence-panel.component";
import {TransactionService} from "../../service/transaction.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  colors = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#3B3EAC'];

  @ViewChild('c') canvas: ElementRef;
  @ViewChild('top5Chart') top5Chart: ElementRef;
  @ViewChild('expencePanel') expencePanel: ExpencePanelComponent;

  lastTransactions: Transaction[] = [];
  topCategories: any[] = [];
  monthlyValues: any[] = [];
  lastMonthStat: any = {
    value: 0.0,
    difference: 0,
    differenceSign: '+'
  };
  mostExpenceMonth: any = null;

  constructor(private service: ExpenceService,
              private transactionService: TransactionService,
              private tagService: TagService) {
  }

  ngOnInit() {
    this.service.findLast(10).subscribe(data => {
      this.lastTransactions = data;
    });

    this.tagService.getMostUsed().subscribe(
      data => {
        data.forEach((d, i) => {
          d.color = this.colors[i];
          d.sum = parseInt(d.sum, 10);
        });

        data.sort((a, b) => {
          return a.sum < b.sum;
        });

        this.topCategories = data;

        this.renderTop5Chart(data);
      }
    );

    this.service.getMonthlyValues().subscribe(
      data => {
        this.monthlyValues = data;
        this.buildLastMonthStat(data);

        const labels = data.map(d => `${d.year}/${d.month}`);
        const values = data.map(d => d.value);

        new Chart(this.canvas.nativeElement, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Euro',
              data: values,
              backgroundColor: ['rgba(49,203,151,.5)'],
              borderColor: ['#31cb97']
            }],
          },
          options: {
            legend: {
              display: false
            }
          }
        });
      }
    );

  }

  renderTop5Chart(data: any[]) {
    const labels = data.map(d => d.name);
    const values = data.map(d => d.sum);


    new Chart(this.top5Chart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: this.colors
        }],
      },
      options: {
        legend: {
          display: false
        }
      }
    });
  }

  buildLastMonthStat(data) {
    this.lastMonthStat.value = data[data.length - 1].value;

    const difference = data[data.length - 1].value - data[data.length - 2].value;

    if (difference < 0) {
      this.lastMonthStat.differenceSign = '-';
    }

//    this.lastMonthStat.difference = numeral(Math.abs(difference)).format();
    this.lastMonthStat.difference = Math.abs(difference);

    // Cerco mese con la spesa più alta
    let maxValue = 0;
    data.forEach(month => {
      const monthvalue = parseInt(month.value, 10);

      if (monthvalue > maxValue) {
        maxValue = monthvalue;
        this.mostExpenceMonth = month;
      }
    });

    if (this.mostExpenceMonth) {
      this.mostExpenceMonth.date = `${this.mostExpenceMonth.month}`;
    }
  }

  removeTransasction(transaction: Transaction) {
    this.transactionService.remove(transaction)
      .subscribe(data => {
        this.lastTransactions = this.lastTransactions.filter(t => {
          return !(t.id === transaction.id);
        });
      });

    return false;
  }

}
