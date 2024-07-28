import { Component } from '@angular/core';

const coutryList: any[] = [
  { name: 'Finland', link: 'finland' },
  { name: 'Sweden', link: 'sweden' },
  { name: 'Norway', link: 'norway' },
  { name: 'Iceland', link: 'iceland' },
  { name: 'United Kingdom', link: 'unitedKingdom' },
  { name: 'Ukraine', link: 'ukraine' },
  { name: 'Ireland', link: 'ireland' },
  { name: 'Portugal', link: 'portugal' },
  { name: 'Spain', link: 'spain' },
  { name: 'France', link: 'france' },
  { name: 'Belgium', link: 'belgium' },
  { name: 'Netherlands', link: 'netherlands' },
  { name: 'Denmark', link: 'denmark' },
  { name: 'Germany', link: 'germany' },
  { name: 'Luxembourg', link: 'luxembourg' },
  { name: 'Switzerland', link: 'switzerland' },
  { name: 'Austria', link: 'austria' },
  { name: 'Italy', link: 'italy' },
  { name: 'Czech Republic', link: 'czechRepublic' },
  { name: 'Slovakia', link: 'slovakia' },
  { name: 'Hungary', link: 'hungary' },
  { name: 'Poland', link: 'poland' },
  { name: 'Lithuania', link: 'lithuania' },
  { name: 'Latvia', link: 'latvia' },
  { name: 'Estonia', link: 'estonia' },
  { name: 'Romania', link: 'romania' },
  { name: 'Moldova', link: 'moldova' },
  { name: 'Slovenia', link: 'slovenia' },
  { name: 'Croatia', link: 'croatia' },
  { name: 'Bosnia and Herzegovina', link: 'bosniaHerzegovina' },
  { name: 'Montenegro', link: 'montenegro' },
  { name: 'Serbia', link: 'serbia' },
  { name: 'Kosovo', link: 'kosovo' },
  { name: 'North Macedonia', link: 'northMacedonia' },
  { name: 'Bulgaria', link: 'bulgaria' },
  { name: 'Albania', link: 'albania' },
  { name: 'Greece', link: 'greece' },
  { name: 'Malta', link: 'malta' },
]; 

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
