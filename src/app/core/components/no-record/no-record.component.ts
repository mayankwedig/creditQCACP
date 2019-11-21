import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-record',
  templateUrl: './no-record.component.html',
  styleUrls: ['./no-record.component.css']
})
export class NoRecordComponent implements OnInit {

  @Input() message: String;
  @Input() collapse: Number;

  constructor() { }

  ngOnInit() {
    this.message = "No Records"
  }

}
