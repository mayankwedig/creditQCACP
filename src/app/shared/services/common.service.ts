import { Injectable, Directive, ElementRef, HostListener } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AbstractControl, ValidatorFn } from "@angular/forms";
import * as $ from "node_modules/jquery";
@Injectable({
  providedIn: "root"
})
export class CommonService {
  constructor(private modalService: NgbModal) {}

  public openPopup(componentName, title) {
    const modalRef = this.modalService.open(componentName, {
      backdrop: "static",
      keyboard: false,
      windowClass: "custom-modal"
    });
    modalRef.componentInstance.title = title;
  }

  public openSuccessPopup(componentName, title) {
    const modalRef = this.modalService.open(componentName, {
      backdrop: "static",
      keyboard: false,
      windowClass: "custom-modal cibil-request-success-modal"
    });
    modalRef.componentInstance.title = title;
  }
  removeFixHeaderFromInnerPages() {
    $(".header-wrap").removeClass("fix");
  }
  combineAddress(data: any) {
    let address = "";
    if (data != null) {
      address =
        data.door_no != null && data.door_no != "" && data.door_no != "null"
          ? data.door_no
          : "";
      if (address != "") {
        address =
          address +
          (data.floor_no != null &&
          data.floor_no != "" &&
          data.floor_no != "null"
            ? ", " + data.floor_no
            : "");
      } else {
        address =
          data.floor_no != null &&
          data.floor_no != "" &&
          data.floor_no != "null"
            ? data.floor_no
            : "";
      }

      if (address != "") {
        address =
          address +
          (data.building_name != null &&
          data.building_name != "" &&
          data.building_name != "null"
            ? ", " + data.building_name
            : "");
      } else {
        address =
          data.building_name != null &&
          data.building_name != "" &&
          data.building_name != "null"
            ? data.building_name
            : "";
      }

      if (address != "") {
        address =
          address +
          (data.street != null && data.street != "" && data.street != "null"
            ? ", " + data.street
            : "");
      } else {
        address =
          data.street != null && data.street != "" && data.street != "null"
            ? data.street
            : "";
      }

      if (address != "") {
        address =
          address +
          (data.location != null &&
          data.location != "" &&
          data.location != "null"
            ? ", " + data.location
            : "");
      } else {
        address =
          data.location != null &&
          data.location != "" &&
          data.location != "null"
            ? data.location
            : "";
      }

      if (address != "") {
        address =
          address +
          (data.city_name != null &&
          data.city_name != "" &&
          data.city_name != "null"
            ? ", " + data.city_name
            : "");
      } else {
        address =
          data.city_name != null &&
          data.city_name != "" &&
          data.city_name != "null"
            ? data.city_name
            : "";
      }

      if (address != "") {
        address =
          address +
          (data.district != null &&
          data.district != "" &&
          data.district != "null"
            ? ", " + data.district
            : "");
      } else {
        address =
          data.district != null &&
          data.district != "" &&
          data.district != "null"
            ? data.district
            : "";
      }

      if (address != "") {
        address =
          address +
          (data.state_name != null &&
          data.state_name != "" &&
          data.state_name != "null"
            ? ", " + data.state_name
            : "");
      } else {
        address =
          data.state_name != null &&
          data.state_name != "" &&
          data.state_name != "null"
            ? data.state_name
            : "";
      }

      if (address != "") {
        address =
          address +
          (data.pin_code != null &&
          data.pin_code != "" &&
          data.pin_code != "null"
            ? " - " + data.pin_code
            : "");
      } else {
        address =
          data.pin_code != null &&
          data.pin_code != "" &&
          data.pin_code != "null"
            ? data.pin_code
            : "";
      }
    }
    return address;
  }

  public closePopup() {
    this.modalService.dismissAll();
  }
public hideBreaCrumMenuOnResponsive(){
   /*$(".jq_main_menu").click(function () {
            $(this).toggleClass("mobile-inner-header-icon-click mobile-inner-header-icon-out");
            $(".main-menu").toggleClass("active");
            $(".jq_overlay").toggleClass("active");
            $("body").toggleClass("body-overflow");
        });*/
}
  public smoothScroll() {
    if (window.pageYOffset > 30) {
      let i = 100;
      const int = setInterval(function() {
        window.scrollTo(0, i);
        i -= 10;
        if (i === 0) {
          window.scrollTo(0, 0);
          clearInterval(int);
        }
      }, 30);
    }
  $(".custom-dropdown-menu").removeClass("open");
  }

  onKeyValidateDecimal(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      let number = /^[.\d]+$/.test(c.value) ? +c.value : NaN;
      if (number !== number) {
        return { value: true };
      }

      return null;
    };
  }

  keyPressNumber(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  _keyPressString(event: any) {
    const pattern = /^[a-zA-Z]*$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
