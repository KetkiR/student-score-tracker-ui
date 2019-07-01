import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { ViewDetailsComponent } from './view-details/view-details.component';


const routes: Routes = [
  {
    path: '',
    component: UpdateDetailsComponent
  },
  {
    path: 'view-details',
    component: ViewDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
