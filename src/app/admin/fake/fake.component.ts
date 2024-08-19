import { Component } from '@angular/core';
import { CountryService } from '../../shared/services/country/country.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-fake',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fake.component.html',
  styleUrl: './fake.component.scss',
})
export class FakeComponent {
  public countryArr: Array<any> = [];
  public fakeForm!: FormGroup;
  /*  public countryForm!: FormGroup;
  public country_edit_status = false; */

  constructor(
    private countryService: CountryService,
    private formBuild: FormBuilder
     /*    private formBuild: FormBuilder,
    private storsgeIcon: Storage,
    private countryService: CountryService */
  ) {}

  ngOnInit(): void {
    this.getCountry();
  }

  getCountry(): void {
    this.countryService.getAll().subscribe((data: any) => {
      this.countryArr = data;
      console.log(this.countryArr);
    });
  }

  onCountrySelect(event: any) {}

  creatCountry() {}
}
