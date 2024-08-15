import { Component } from '@angular/core';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  ngOnInit() {
    console.log('Hello');
  }

  open_country(country: any) {
    console.log(country);
  }

  onMouseOver(coutry: string): void {
 
    console.log(coutry);
    
/*     if (element) {
      const countryId = element.id;
      console.log('Hovered country ID:', countryId);
      // Виконайте необхідні дії тут
    }  */
  }
}
