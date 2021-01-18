import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class APIInfoService {
  data: any;
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    const url = 'http://localhost:3000/data';
    return this.http.get<any>(url);
  }
  // createData

  public pushData(text: any) {
    const url = 'http://localhost:3000/data';
    this.data = JSON.parse(text);
    console.log(this.data);
    this.http
      .post(url, this.data)
      .toPromise()
      .then((d) => {
        console.log(d);
        //    window.location.reload();
      });
    alert('Record Saved Successfully');
    this.tempAlert('', 5000);
  }
  // Edit and delete data
  //not deleted actual record
  //change status active to inactive 
  public pushEditData(text: any) {
    //alert("In pushEditData");
    const url = 'http://localhost:3000/data';
    this.data = JSON.parse(text);
    //alert(this.data);
    //console.log(this.data.id);
    var id = this.data.id;

    this.http
      .put('http://localhost:3000/data/' + id, this.data)
      .toPromise()
      .then((d) => {
        console.log(d);
        //alert("In PUT Call")
        //alert("In PUT Call"+JSON.stringify(d) );
      });
    alert('Record Edited Successfully');
    //alert(this.data);
    this.tempAlert('', 5000);
  }

  tempAlert(msg: any, duration: any) {
    var el = document.createElement('div');
    el.setAttribute('style', '');
    el.innerHTML = msg;
    setTimeout(function () {
      el.parentNode.removeChild(el);
    }, duration);
    document.body.appendChild(el);
  }
}
