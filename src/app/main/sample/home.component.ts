
import { HttpService } from "./../../service/http.service";
import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  charts: any = [];
  neutralArr: any[] = [];
  positiveArr: any[] = [];
  negativeArr: any[] = [];
  //  labels = Utils.months({count: 7});
  // labels = ''
  //  data = {
  //   labels: this.labels,
  //   datasets: [{
  //     label: 'My First Dataset',
  //     data: [65, 59, 80, 81, 56, 55, 40],
  //     fill: false,
  //     borderColor: 'rgb(75, 192, 192)',
  //     tension: 0.1
  //   }]
  // };
  // config = {
  //   type: 'line',
  //   data: this.data,
  // };
  //   // Do not show lines for all datasets by default
  // // Chart.defaults.datasets.line.showLine = false;

  // // This chart would show a line only for the third dataset

  //  chart = new Chart(new CanvasRenderingContext2D(), {
  //     type: 'line',
  //     data: {
  //         datasets: [{
  //             data: [0, 0],
  //         }, {
  //             data: [0, 1]
  //         }, {
  //             data: [1, 0],
  //             showLine: true // overrides the `line` dataset default
  //         }, {
  //             type: 'scatter', // 'line' dataset default does not affect this dataset since it's a 'scatter'
  //             data: [1, 1]
  //         }]
  //     }
  // });

  products: any[] = [];
  productReviews: any[] = [];
  public openSearchRef = false;
  public searchText = "";
  constructor(private httpService: HttpService) {}

  public contentHeader: object;

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.contentHeader = {
      headerTitle: "Home",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Home",
            isLink: true,
            link: "/",
          },
          // {
          //   name: "Sample",
          //   isLink: false,
          // },
        ],
      },
    };
  }

  searchUpdate(event) {
    if (event.target.value.length > 1) {
      this.neutralArr = [];
      this.positiveArr = [];
      this.negativeArr = [];
      const val = event.target.value.toLowerCase();
      const formData = new FormData();
      formData.append("search", val);
      // , {headers:{'Authorization': `Token ${localStorage.getItem('token')}`}}
      this.httpService.post("api/get", formData).subscribe((response) => {
        console.log(response);
        for (let data of response?.get_json) {
          for (let value of data?.review_data) {
            if (value?.status?.toLowerCase() == "neutral") {
              this.neutralArr.push(value?.status);
            } else if (value?.status?.toLowerCase() == "positive") {
              this.positiveArr.push(value?.status);
            } else if (value?.status?.toLowerCase() == "negative") {
              this.negativeArr.push(value?.status);
            }
          }
        }

        if (response && response?.get_json) {
          this.products = response?.get_json;
          const ctx = document.querySelector("canvas").getContext("2d");
          
          this.charts = new Chart(ctx, {
            type: "line",
         
            data: {
              datasets: [
                {
                  label: "Neutral",
                  data: [0, this.neutralArr.length],
                  backgroundColor: "#C0C0C0",
                  
                  
                },
                {
                  label: "Negative",
                  data: [0, this.negativeArr.length],
                  backgroundColor: "#FF0000",
                },
                {
                  label: "Positive",
                  data: [0, this.positiveArr.length],
                  backgroundColor: "#008000",
                },
              
              ],
            },
          });
        }
      });
    }
  }
}
