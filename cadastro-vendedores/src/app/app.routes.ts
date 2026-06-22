import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { SellerComponent } from './components/seller-component/seller-component';

export const routes: Routes = [{ path: '', component: HomeComponent },
    { path: 'cadastro', component: SellerComponent },

];
