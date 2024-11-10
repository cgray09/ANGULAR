import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  buttonVals = ['1','2','3','/','4','5','6','X','7','8','9','-','(',')','0','+','c','.','=','%'];

  inputVals = '';

  getInput(e:any, val: string) {
    e.preventDefault();
    if(val == 'X') {
      this.inputVals += "*";
    }
    else if(val == "=" && this.inputVals == '.') {
      alert("Please enter a valid mathematical expression.");
    }
    else if(val == "=") {
      this.inputVals = eval(this.inputVals);
    }
    else if(val == "c") {
      this.inputVals = this.inputVals.slice(0,this.inputVals.length-1);
    }
    else {
      this.inputVals += val;
    }

  }
}
