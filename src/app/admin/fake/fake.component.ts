import { Component } from '@angular/core';
import { CountryService } from '../../shared/services/country/country.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CountryResponse } from '../../shared/interfaces/country';
import { EditorModule } from '@tinymce/tinymce-angular';
import { Storage, deleteObject, getDownloadURL, percentage, ref, uploadBytesResumable } from '@angular/fire/storage';



@Component({
  selector: 'app-fake',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EditorModule],
  templateUrl: './fake.component.html',
  styleUrl: './fake.component.scss',
})
export class FakeComponent {
  public countryArr: Array<any> = [];
  public fakeForm!: FormGroup;
  public uploadPercent!: number;
  public imageOrganization = '';


  constructor(
    private countryService: CountryService,
    private formBuild: FormBuilder,
    private storsgeIcon: Storage
  ) {}

  ngOnInit(): void {
    this.getCountry();
    this.initcountryForm();
  }

  initcountryForm(): void {
    this.fakeForm = this.formBuild.group({
      country: [null],
      nameOrganization: [null],
      descriptionOrganization: [null],
      imageOrganization: [null],
      linkPetition: [null],
    });
  }

  getCountry(): void {
    this.countryService.getAll().subscribe((data: any) => {
      this.countryArr = data;
      this.countryArr.sort((a, b) => a.name.localeCompare(b.name)); 
    });
  }
  onCountrySelect(event: any): void {
    const selectedCountry = event.target.value;
    console.log(selectedCountry);
    
 /*    if (selectedCountry) {
      this.fakeForm.patchValue({
        country: selectedCountry,
      });
    }
    console.log(this.fakeForm.value); */
  }

  creatCountry() {

    console.log(this.fakeForm.value);
    
  }

  // Завантаження зображення
  async uploadUserImage(actionImage: any): Promise<void> {
    const file = actionImage.target.files[0];
    const previousImageURL = this.imageOrganization;
    const task = ref(this.storsgeIcon, previousImageURL);
    if (previousImageURL.startsWith('https://firebasestorage.googleapis.com')) {
      deleteObject(task).then(() => {
        this.uploadPercent = 0;
        this.fakeForm.patchValue({
          imageOrganization: null,
        });
      });
    }

    this.loadFIle('fake-image', file.name, file)
      .then((data) => {
        if (this.uploadPercent == 100) {
          this.fakeForm.patchValue({
            imageOrganization: data,
          });

          this.imageOrganization = data;
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
