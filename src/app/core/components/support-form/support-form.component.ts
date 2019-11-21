import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MasterService } from '../../../user/services/master.service';
import { CommonService } from '../../../shared/services/common.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';
declare var jquery:any;
declare var require: any
require("../../../../assets/js/SideNavi.js")
declare var SideNavi: any
@Component({
  selector: 'app-support-form',
  templateUrl: './support-form.component.html',
  styleUrls: ['./support-form.component.css']
})
export class SupportFormComponent implements OnInit {
	
	constructor(private masterService: MasterService
		, private errorHandlerService: ErrorHandlerService, public commonService: CommonService) { }
	ngOnInit() {
		$(document).ready(function(){
			SideNavi.init('right', {
				container : '#sideNavi',
				defaultitem : '.side-navi-item-default',
				item : '.side-navi-item',
				data : '.side-navi-data',
				tab : '.side-navi-tab',
				active : '.active'
			});
		});
		this.getSupportQuestion();
	}
	selectedQuesData:any=[0];
	// questionData : any=[
	// 	{"id":0,"support_question":"Select Support Question"}
	// ]
	questionData : any=[];
	postData = {
		"full_name": "",
		"question_id": 0,
		"email": "",
		"mobile": ""
	  }
	errorMessage: string = ''
	//Get support qurestions
	getSupportQuestion() {
		this.masterService.support_question().subscribe((result) => {
			this.questionData = result.body;
			this.questionData.splice(0, 0, {
				id: 0,
				support_question: 'Select Support Question'
			});
			// result.body.forEach(element => {
			// 	this.questionData.push(element);
			// });
		}, error => {
			//this.errorHandlerService.handleError(error)
		});
	}

	removeError() {
	this.errorMessage = ''
	}

	_keyPress(event: any) {
	const pattern = /[0-9]/;
	let inputChar = String.fromCharCode(event.charCode);
	if (!pattern.test(inputChar)) {
		event.preventDefault();
	}
	}
	save(form: NgForm) {
		
		this.errorMessage = ''
		if (this.postData.question_id <= 0) {
			
			this.errorMessage = 'Please select question';
		} else if (this.postData.mobile.length != 10) {
			
			this.errorMessage = 'Invalid Mobile Number';
		} else {
			
			this.masterService.save_support_question(this.postData).pipe().subscribe((result) => {
				
				let myDiv = document.getElementById('sideNavi');
				myDiv.style.right = '50px';
				var element = document.getElementById("sideNaviButton");
				var reg = new RegExp('(\\s|^)' + "active" + '(\\s|$)');
				element.className = element.className.replace(reg, '');
				this.errorHandlerService.successMessage('Your query successfully submitted. Our executive will be contact within 24 hours.');
				form.reset();
				this.postData.question_id = 0;
			}, error => {
				
				this.errorHandlerService.handleError(error)
			});
		}
	}
}