
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArraysComponent } from './data-structures/arrays/arrays.component';
import { SortingAlgorithmsComponent } from './sorting-algorithms/sorting-algorithms.component';
import { HashTablesComponent } from './data-structures/hash-tables/hash-tables.component';


const routes: Routes = [
  {path: 'arrays', component: ArraysComponent},
  {path: 'sorting', component: SortingAlgorithmsComponent},
  {path: 'hash', component: HashTablesComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }