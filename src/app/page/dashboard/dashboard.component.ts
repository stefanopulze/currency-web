import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ExpenceService} from '../../service/expence.service';
import {Transastion} from '../../model/transaction.model';
import {TagService} from '../../service/tag.service';
import Chart from 'Chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('c') canvas: ElementRef;

  lastTransactions: Transastion[] = [];
  topCategories: any[] = [];
  monthlyValues: any[] = [];

  constructor(
    private service: ExpenceService,
    private tagService: TagService) { }

  ngOnInit() {
    this.service.findLast(10).subscribe( data => {
      this.lastTransactions = data;
    });

    this.tagService.getMostUsed().subscribe(
      data => this.topCategories = data
    );

    this.service.getMonthlyValues().subscribe(
      data => {
        this.monthlyValues = data;

        const labels = data.map(d => `${d.year}/${d.month}`);
        const values = data.map(d => d.value);
        console.log(values);

        new Chart(this.canvas.nativeElement, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Euro',
              data: values,
              backgroundColor: ['rgba(78,131,252,.5)'],
              borderColor: ['#4e83fc']
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

}
