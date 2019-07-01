import { Component, OnInit } from '@angular/core';
import { StudentDetailsService } from '../student-details.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.css']
})
export class UpdateDetailsComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl(),
    score: new FormControl(),
    date: new FormControl()
  });
  showLoader = false;
  isError = false;
  isSuccess = false;
  alertMessage: any;
  barChartData: any;

  constructor(private StudentService: StudentDetailsService) {}

  ngOnInit() {}

  /**
   * @description - function to upload student score data
   */

  uploadStudentData() {
    const formData = new FormData();
    this.isError = false;
    if (
      this.form.value.name &&
      this.form.value.score &&
      this.form.value.name.trim()
    ) {
      formData.append(
        'name',
        this.capitalize_Words(this.form.value.name.trim())
      );
      formData.append('score', this.form.value.score);
      formData.append('date', this.form.value.date);
      this.isError = false;
      this.isSuccess = false;
      this.StudentService.saveStudentDetails<any[]>(formData).subscribe(
        (response: any) => {
          this.isSuccess = true; // show success message
          this.alertMessage = response.message; // display error messages from backend
        },
        (error: any) => {
          this.showLoader = false;
          this.isError = true;
          if (error.status === 500) {
            // user should not be able to see system related errors
            this.alertMessage = 'Something Went Wrong !!!!';
          } else {
            this.alertMessage = error.error.message;
          }
        }
      );
    } else {
      // executes if score or name fields are blank
      this.alertMessage = 'Please fill the complete information';
      this.isError = true;
    }
  }

  /**
   * @description - to capitalize First letter of the students full name
   * @param str - string containing student's name .
   */

  capitalize_Words(str) {
    return str.replace(
      /\w\S*/g,
      txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }

  /**
   * @description - function to check if entered key is digit
   * @param evt - event object conprising event details
   */
  isNumber(evt) {
    evt = evt ? evt : window.event;
    let charCode = evt.which ? evt.which : evt.keyCode;
    if (evt.target.value.length >= 10) {
      return false;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
