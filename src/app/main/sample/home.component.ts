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
  productReviews:any[] = [];
  public openSearchRef = false;
  public searchText = '';
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
          {
            name: "Sample",
            isLink: false,
          },
        ],
      },
    };
 
  }

  searchUpdate(event) {
    if(event.target.value.length){
      const val = event.target.value.toLowerCase();
      const formData = new FormData();
      formData.append("search", val);
      // , {headers:{'Authorization': `Token ${localStorage.getItem('token')}`}}
      this.httpService.post("api/get", formData).subscribe((response) => {
        if(response && response?.get_json ){
          this.products = response?.get_json;
          const ctx = document.querySelector('canvas').getContext('2d');
          this.charts = new Chart( ctx, {
type:'line',
data: {
  datasets: [{
    label:'Neutral',
      data: [0, 1],
      backgroundColor: 'rgba(0, 99, 132, 0.2)',
  }, {
    label:'Negative',
      data: [5, 1],
      backgroundColor: 'rgb(255, 99, 132)'
  }, {
    label:'Positive',
      data: [3, 0],
      // showLine: true, // overrides the `line` dataset default
      backgroundColor: 'rgb(255, 99, 0)'
  },
  //  {
  //     type: 'scatter', // 'line' dataset default does not affect this dataset since it's a 'scatter'
  //     data: [1, 1]
  // }
]
}
          })}})}
        


          // const divCol = document.createComment('div');
          // let canvas = document.createElement('canvas');
          // canvas = divCol?.appendChild(canvas);
          // canvas.setAttribute('id', 'chart');
          // document.getElementById('charts')?.appendChild(divCol);
          // document.getElementById('charts');
          // const id = <HTMLCanvasElement> document.getElementById('charts');
        //  const ctx = <HTMLElement>document.getElementById('charts').getContext('2d');
//         const canvas = <HTMLCanvasElement> document.getElementById('charts');
// const ctx = canvas.getContext('2d');
//           this.charts = new Chart( ctx, {
// type:'line',
// data: {
//   datasets: [{
//     label:'first',
//       data: [0, 1],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//     ],
//   }, {
//     label:'second',
//       data: [0, 1]
//   }, {
//     label:'third',
//       data: [1, 0],
//       showLine: true // overrides the `line` dataset default
//   },
//   //  {
//   //     type: 'scatter', // 'line' dataset default does not affect this dataset since it's a 'scatter'
//   //     data: [1, 1]
//   // }
// ]
// }
//           })
//         }
      
//       });
//     }

    // if (val !== '') {
    //   this.document.querySelector('.app-content').classList.add('show-overlay');
    // } else {
    //   this.document.querySelector('.app-content').classList.remove('show-overlay');
    // }
    // this.autoSuggestion(event);
  }
}
