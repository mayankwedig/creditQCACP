import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-professional-dashboard",
  templateUrl: "./professional-dashboard.component.html",
  styleUrls: ["./professional-dashboard.component.css"]
})
export class ProfessionalDashboardComponent implements OnInit {
  isSearch = false;
  postData = {
    gst_no: "",
    payment_due_date: ""
  };
  constructor() {}

  ngOnInit() {}
}
