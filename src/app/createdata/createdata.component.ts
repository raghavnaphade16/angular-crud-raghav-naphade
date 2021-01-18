import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { APIInfoService } from '../apiinfo.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import {
  validFirstChar,
  validLastChar,
} from '../shared/customvalidator.validator';

declare var jQuery: any;
@Component({
  selector: 'app-createdata',
  templateUrl: './createdata.component.html',
  styleUrls: ['./createdata.component.css'],
})
export class CreatedataComponent implements OnInit, OnDestroy {
  fname: string = '';
  lname: string = '';
  usrEmail: string = '';
  usrId: any = '';
  myData: any = [];
  send: any;
  userForm: FormGroup = new FormGroup({});
  submitted = false;
  hideModal: boolean = false;
  constructor(
    private apidata: APIInfoService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.userForm = formBuilder.group({
      id: new FormControl(''),
      first_name: new FormControl('', [Validators.required, validFirstChar]),
      last_name: new FormControl('', [Validators.required, validLastChar]),
      email: new FormControl('', [Validators.required, Validators.email]),
      status: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.apidata.getData().subscribe((data: any) => {
      this.myData = data;
      //console.log(data.data.length);
      // console.log(typeof(this.myData.data.length));
    });
  }
  refresh() {
    this.apidata.getData().subscribe((data: any) => {
      this.myData = data;
    });
  }
  get f() {
    return this.userForm.controls;
  }
  openAddNewModal() {
    this.userForm.controls.first_name.setValue('');
    this.userForm.controls.last_name.setValue('');
    this.userForm.controls.email.setValue('');
    jQuery('#addNewModal').modal('toggle');
  }

  openEditModal(usr: any, myId: any) {
    jQuery('#editModal').modal('toggle');
    console.log(myId);
    console.log();
    // jQuery("#editModal #first_name").val(usr.first_name)
    // jQuery("#editModal #last_name").val(usr.last_name)
    // jQuery("#editModal #email").val(usr.email)

    this.fname = usr.first_name;
    this.lname = usr.last_name;
    this.usrEmail = usr.email;
    this.usrId = usr.id;
  }
  editData(): void {
    this.submitted = true;
    if (this.userForm.invalid) {
      console.log('Wrong');
      return;
    } else {
      jQuery('#editModal').modal('hide');

      console.log('In Edit Else Part');
      //alert(JSON.stringify(this.userForm.value));
      console.log(this.userForm.value);
      this.userForm.controls.status.setValue('active');
      //alert("Before Call");
      this.apidata.pushEditData(JSON.stringify(this.userForm.value));
      //alert("After Call");
      this.userForm.controls.first_name.setValue(' ');
      this.userForm.controls.last_name.setValue(' ');
      this.userForm.controls.email.setValue(' ');

      window.location.reload();
      this.refresh();
      //window.location.reload();
      // window.location.reload();
    }
  }
  sendData() {
    var flag = 0;
    var myemail = this.userForm.value.email;
    
    for (var i = 0; i < this.myData.length; i++) {
      if (this.myData[i].email == myemail) {
        flag = 1;
      }
    }
    if (this.userForm.invalid) {
      return;
    } else if (flag == 1) {
      alert('User already exists');
      return;
    } else {
      var lId: any;
      jQuery('#addNewModal').modal('hide');
      console.log(this.myData.length);
      for (var i = 0; i < this.myData.length; i++) {
        lId = this.myData[i].id;
      }
      this.userForm.controls.id.setValue(lId + 1);
      this.userForm.controls.status.setValue('active');
      this.apidata.pushData(JSON.stringify(this.userForm.value));
      this.userForm.controls.first_name.setValue(' ');
      this.userForm.controls.last_name.setValue(' ');
      this.userForm.controls.email.setValue(' ');

      window.location.reload();
    }
  }

  openDeleteModal(usr: any) {
    jQuery('#deleteModal').modal('toggle');
    console.log(usr);
    this.fname = usr.first_name;
    this.lname = usr.last_name;
    this.usrEmail = usr.email;
    this.usrId = usr.id;
  }
  deleteData() {
    jQuery('#deleteModal').modal('hide');
    //console.log(this.userForm.value);
    this.userForm.controls.status.setValue('inactive');
    this.apidata.pushEditData(JSON.stringify(this.userForm.value));
    this.userForm.controls.first_name.setValue(' ');
    this.userForm.controls.last_name.setValue(' ');
    this.userForm.controls.email.setValue(' ');

    //window.location.reload();
    window.location.reload();
  }
  public ngOnDestroy(): void {
    //this.apidata.unsubscribe(); // or something similar
  }
}

// console.log((this.myData.data.length));
// console.log((this.myData.data[0].id));
//       console.log(typeof(this.myData.data.length));
// console.log((this.myData.data.length));
// console.log((this.myData.data[0].id));
//console.log(typeof(this.myData));

//  for(var i=0;i<this.myData[0].length;i++){
//     console.log(this.myData.data[i])
//  }
