import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutProjectComponent } from './pages/about-project/about-project.component';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin/admin.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { EventsComponent } from './pages/events/events.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CountryComponent } from './admin/country/country.component';
import { FakeComponent } from './admin/fake/fake.component';
import { AbutComponent } from './admin/abut/abut.component';
import { AddPartnerComponent } from './admin/add-partner/add-partner.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about-project', component: AboutProjectComponent },
  { path: 'partners', component: PartnersComponent },
  { path: 'events', component: EventsComponent },
  { path: 'contact', component: ContactComponent },

  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: CountryComponent, pathMatch: 'full' },
      { path: 'country', component: CountryComponent },
      { path: 'fake', component: FakeComponent },
      { path: 'about', component: AbutComponent },
      { path: 'partners', component: AddPartnerComponent },
      { path: '', pathMatch: 'full', redirectTo: 'action' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
