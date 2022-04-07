import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {

  random_beer_data:any;

  beerName:any
  beerDescription:any;
  beerImageURL:any;

  selectedRadioValue: any;
  searchResult: any;

  isLoading:boolean=false;
  search_keyword: any;
  empty_search: boolean = false;

  constructor(private router:Router,private auth:RestService,private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this._getRandomBeer(); //On initial load, show the user a random beer
  }
  _getRandomBeer(){
    this.isLoading=true;
    this.auth.getRandomBeer()
    .subscribe((result: any) => {
      if (result.length > 0) {
        this.isLoading=false;
         this.random_beer_data = result;
        this.beerName = result[0].name;
        this.beerDescription = result[0].description;
        this.beerImageURL = result[0].image_url;
      } else{
        this.isLoading=false;
        this.random_beer_data = result;
        this.openSnackBar("No Alcholic beer present","close")
      }
    }
    );
  }

  logout(){
    this.auth.onLogout();
    this.router.navigate(['/login']);
  }

  anotherBeer_btnclick(){
    this.isLoading=true;
    this._getRandomBeer();
  }

  radomNHbeer_btnclick(){
    this.isLoading=true;
    this.auth.getNonbeer(0.05)
    .subscribe((result: any) => {
      if (result.length > 0) {
        this.isLoading=false;
        this.random_beer_data = result;
        this.beerName = result[0].name;
        this.beerDescription = result[0].description;
        this.beerImageURL = result[0].image_url;
      } else{
        this.isLoading=false;
        this.random_beer_data = result;
        this.openSnackBar("No Non-Alcholic beer present","close")
      }
    });
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  radioChange(event:any){
    this.selectedRadioValue = event.value;
  }

  seachItem(value:any){
    this.search_keyword = value.replaceAll(/_/g, '_');
    var validator =  this._searchKeywordValidator(this.search_keyword);
    if(this.selectedRadioValue === undefined) this.selectedRadioValue = 'name';
    if(this.search_keyword !== '' && validator && this.selectedRadioValue !== undefined ){
      this.auth.getSingleBeer(this.search_keyword).subscribe((result: any) => {
        if (result.length > 0) {
          this.searchResult = result;
        } else{
          this.empty_search = true;
          this.searchResult = result;
        }
      });
    }else{
      this.openSnackBar("Kindly enter valid search keyword","close")
    }
  }

  _searchKeywordValidator(keyword:any){
      return /^[A-Za-z0-9 -]*$/.test(keyword);
  }
}

