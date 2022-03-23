import { HttpService } from "./../../service/http.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  productReviews:any[] = [];
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
    const formData = new FormData();
    formData.append("search", "cards");
    // , {headers:{'Authorization': `Token ${localStorage.getItem('token')}`}}
    this.httpService.post("api/get", formData).subscribe((response) => {
      console.log(response);
      if(response && response?.get_json )
      this.products = response?.get_json
    });
  }
}
