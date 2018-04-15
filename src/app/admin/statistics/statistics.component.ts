import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { DeviceDetectorService } from "ngx-device-detector";
import { StatisticsService } from "../../core/services/statistics.service";
import { Chart } from 'chart.js'

@Component({
    moduleId: module.id,
    templateUrl: 'statistics.component.html'
})
export class StatisticsComponent implements OnInit{
    
    // For chart
    //browserChart: any;
    browserData = new Map<String, number>();
    osData = new Map<String, number>();

    // For html template
    browsers = new Array<String>();
    os = new Array<String>();
    dates = new Array<Date>();

    constructor(public translate: TranslateService,
                private statisticsService: StatisticsService) { };

    ngOnInit()  {
        this.statisticsService.getStatistics().subscribe(arr => {
            arr.forEach(stats => {
                this.dates.push(stats.visitDate);

                if (!this.browserData.has(stats.browser)) {
                    this.browserData.set(stats.browser, 1);
                    this.browsers.push(stats.browser);
                } else  {
                    this.browserData.set(stats.browser, this.browserData.get(stats.browser)+1);
                }

                if (!this.osData.has(stats.os)) {
                    this.osData.set(stats.os, 1);
                    this.os.push(stats.os);
                } else  {
                    this.osData.set(stats.os, this.osData.get(stats.os)+1);
                }
            })
        });

        //this.createChart();
    }

    /*private createChart(): void{
        this.browserChart = new Chart('canvas', {
            type: 'doughnut',
            data: {
                labels: Array.from(this.browserData.keys()),
                datasets: [{
                    data: Array.from(this.browserData.values())
                }],
                options: {
                    "cutoutPercentage": 50,
                    "animation": {
                        "animateScale": true,
                        "animateRotate": false
                    }
                }
            }
        });
    }*/

}