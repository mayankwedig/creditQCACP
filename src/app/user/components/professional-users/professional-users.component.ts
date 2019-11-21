import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-professional-users",
  templateUrl: "./professional-users.component.html",
  styleUrls: ["./professional-users.component.css"]
})
export class ProfessionalUsersComponent implements OnInit {
  isSearch = false;
  postData = {
    gst_no: "",
    payment_due_date: ""
  };
  constructor() {}

  ngOnInit() {}
}
