import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-analysisTab',
  templateUrl: 'analysisTab.page.html',
  styleUrls: ['analysisTab.page.scss']
})
export class analysisTabPage implements OnInit{
  @ViewChild("lineCanvas") lineCanvas;
  @ViewChild("doughnutCanvas") doughnutCanvas;

  private pieChart: Chart;
  private lineChart: Chart;

  constructor() {}

  ngOnInit() {

    
  }

  ngAfterViewInit() {
    this.pieChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Wrong posture time", "Rignt posture time"],
        datasets: [
          {
            label: "total time",
            data: [19, 50],
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(75, 192, 100, 0.5)"
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB"],
            
          }
        ]
      },
      options: {
        percentageInnerCutout: 10,
        cutoutPercentage: 65
      }
    });

  

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: ["Monday", "Tuesday", "Wedesday", "Thuseday", "Firday", "Satuday", "Sunday"],
        datasets: [{
          label: "Right posture time",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,19,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40],
          spanGaps: false          
        }, {
          label: "Wrong posture time",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(240, 60, 60,0.4)",
          borderColor: "rgba(240, 60, 60,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(100,0,0,1)",
          pointBackgroundColor: "#000",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(240,192,192,1)",
          pointHoverBorderColor: "rgba(240,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [56, 85, 18, 18, 65, 44, 20],
          spanGaps: false          
        }]
      }
    })  }

}
