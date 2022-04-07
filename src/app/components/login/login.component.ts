import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  userid: string[] = ['wellthy', 'alok', 'kiran',"Demo"];// login user ids
  authorise: boolean = false;
  
  submitted:boolean = false;  // show and hide the success message
  isLoading: boolean = false; // disable the submit button if we're loading
  
  form: FormGroup;
  login: FormControl = new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]);
  password: FormControl = new FormControl(null, [Validators.required,Validators.minLength(8)]);
  
  constructor(private formBuilder: FormBuilder, private router:Router,private _snackBar: MatSnackBar) {
    this.form = this.formBuilder.group({
      login: this.login,
      password: this.password,
    });
  }
  ngOnInit() {
    if(sessionStorage.getItem('login') === 'true')  this.router.navigate(['/home']);
  }

  get firstname(){
    return this.form.get('firstName')
  }

  onSubmit() {
    if (this.form.status == 'VALID') {
    this.userid.forEach( (element) => {
      if(element === this.form.get('login')?.value && this.form.get('password')?.value==='Asd@1234'  ){
      this.authorise= true;
      }
   });
   if(this.authorise === true){
    this.form.disable(); // disable the form
    this.submitted = true;
    sessionStorage.setItem('login','true');
    this.router.navigate(['/home']);
    this.form.reset(); // reset form
   }else{
    this.openSnackBar("Enter Valid Credentials","close");
  }
} else{
    this.openSnackBar("Invalid Form","close");
    return;
  }
 }
openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action);
} 
}
