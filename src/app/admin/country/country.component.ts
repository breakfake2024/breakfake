import { Component, Inject, PLATFORM_ID } from '@angular/core';
import {
  collection,
  CollectionReference,
  DocumentData,
  Firestore,
} from '@angular/fire/firestore';
import {
  deleteObject,
  getDownloadURL,
  percentage,
  ref,
  Storage,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { LocalStorageService } from '../../shared/services/localStorage/local-storage.service';
import { CountryService } from '../../shared/services/country/country.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';


@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryComponent {
  coutryList: any[] = [
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
  public countryForm!: FormGroup;
  public countryArr: Array<any> = [];
  public country_edit_status = false;
  private countryID!: number | string;
  public countryImage = '';
  public uploadPercent!: number;

  constructor(
    private formBuild: FormBuilder,
    private storsgeIcon: Storage,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.sortCountryList();
    this.initcountryForm();
  }

  sortCountryList(): void {
    this.coutryList.sort((a, b) => a.name.localeCompare(b.name));
  }

  initcountryForm(): void {
    this.countryForm = this.formBuild.group({
      name: [null, Validators.required],
      link: [null, Validators.required],
      image: [null, Validators.required],
    });
  }

  getCountry(): void {
    this.countryService.getAll().subscribe((data: any) => {
      this.countryArr = data;
    });
  }

  onCountrySelect(event: any): void {
    const selectedLink = event.target.value;
    const selectedCountry = this.coutryList.find(
      (country) => country.link === selectedLink
    );

    if (selectedCountry) {
      this.countryForm.patchValue({
        name: selectedCountry.name,
        link: selectedCountry.link,
      });
    }
  }

  // Редагування категорію
  editContry(country: any) {
    this.countryForm.patchValue({
      name: country.name,
      link: country.link,
      image: country.image,
    });

    this.country_edit_status = true;
    this.countryID = country.id;
  }

  creatCountry() {
    if (this.country_edit_status) {
      this.countryService
        .editCountry(this.countryForm.value, this.countryID as string)
        .then(() => {
          console.log(this.countryArr);
        });
    } else {
      let currentContryNumber =
        this.countryForm.get('country')?.value?.numberСategories;
      if (
        typeof currentContryNumber === 'number' &&
        !isNaN(currentContryNumber)
      ) {
        // Збільшуємо значення на 1 при додаванні нової категорії
        currentContryNumber += 1;

        // Оновлюємо значення numberСategories у формі перед відправкою
        this.countryForm.patchValue({
          numberCountry: currentContryNumber,
        });
      }

      this.countryService.addCountry(this.countryForm.value).then(() => {
        console.log('11111');
      });
    }
  }

  // Завантаження зображення
  async uploadUserImage(actionImage: any): Promise<void> {
    const file = actionImage.target.files[0];
    const previousImageURL = this.countryImage;
    const task = ref(this.storsgeIcon, previousImageURL);
    if (previousImageURL.startsWith('https://firebasestorage.googleapis.com')) {
      deleteObject(task).then(() => {
        this.uploadPercent = 0;
        this.countryForm.patchValue({
          image: null,
        });
      });
    }

    this.loadFIle('counry-image', file.name, file)
      .then((data) => {
        if (this.uploadPercent == 100) {
          this.countryForm.patchValue({
            image: data,
          });

          this.countryImage = data;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Завантаження файлу в хмарне сховище
  async loadFIle(
    folder: string,
    name: string,
    file: File | null
  ): Promise<string> {
    const pathIcon = `${folder}/${name}`;
    let urlIcon = '';
    if (file) {
      try {
        const storageRef = ref(this.storsgeIcon, pathIcon);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe((data: { progress: number }) => {
          this.uploadPercent = data.progress;
        });
        await task;
        urlIcon = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('Wrong file');
    }
    return Promise.resolve(urlIcon);
  }
}
