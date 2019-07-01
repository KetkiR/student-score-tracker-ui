import { Component, OnInit } from '@angular/core';
import { StudentDetailsService } from '../student-details.service';
import * as $ from 'jquery';
import * as moment from 'moment';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {
  studentDetails: any;
  noChartDetails = true;
  alertMessage = '';
  title = 'Student Score Details'; // graph title
  type = 'LineChart'; // graph type
  columnNames = ['Date', 'Score']; // graph column names
  width = 600; // graph width
  height = 600; // graph height
  chardDataAvailable = false;
  chartData = [];
  isWarning = false;
  dropdownOptions: any;

  constructor(private StudentService: StudentDetailsService) {}

  ngOnInit() {
    this.getDetails();
  }

  /**
   * @description - function to fetch first student record data and list of students.
   */

  getDetails() {
    this.isWarning = false;
    this.chardDataAvailable = false;
    this.StudentService.getChartDetails<any[]>().subscribe(
      (data: any[]) => {
        this.isWarning = false;
        this.studentDetails = data;
        if (
          this.studentDetails &&
          this.studentDetails &&
          this.studentDetails.firstStudent.length
        ) {
          const tempArray = [];
          for (const record of this.studentDetails.firstStudent) {
            // this.studentDetails.firstStudent is the first student \
            // record in mongodb
            tempArray.push([new Date(record.date), parseInt(record.score, 0)]);
          }
          this.chartData = tempArray;
          this.chardDataAvailable = true;
        } else {
          this.isWarning = true;
          this.alertMessage =
            'No data to show! Please go to Enter score to enter score per student';
        }
        if (
          this.studentDetails &&
          this.studentDetails.studentList &&
          this.studentDetails.studentList.length
        ) {
          // this.studentDetails.studentList is \
          // the list of all distinct students
          this.dropdownOptions = this.studentDetails.studentList;
        }
      },
      (error: any) => {
        this.alertMessage = error.error.message;
        this.isWarning = true;
      }
    );
  }

  /**
   * @description - fetch student score data to display charts (called when student is selected from dropdown)
   * @param event - event object
   */

  changeStudent(event) {
    console.log(event.target.value);
    this.StudentService.getStudentDetails<any[]>(event.target.value).subscribe(
      (data: any[]) => {
        this.studentDetails = data;
        if (
          this.studentDetails &&
          this.studentDetails.studentDetails &&
          this.studentDetails.studentDetails.length
        ) {
          const tempArray = [];
          for (const record of this.studentDetails.studentDetails) {
            tempArray.push([new Date(record.date), parseInt(record.score, 0)]);
          }
          this.chartData = tempArray;
          this.chardDataAvailable = true;
        } else {
          this.isWarning = true;
          this.alertMessage = 'No data to show!';
        }
        if (
          this.studentDetails &&
          this.studentDetails.studentList &&
          this.studentDetails.studentList.length
        ) {
          this.dropdownOptions = this.studentDetails.studentList;
        }
      },
      error => () => {
        console.log('error', 'Something went wrong...');
        this.alertMessage = error.error.message;
      }
    );
  }
}
