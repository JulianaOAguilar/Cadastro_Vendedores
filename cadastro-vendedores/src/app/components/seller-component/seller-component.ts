import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seller-component',
  imports: [FormsModule],
  templateUrl: './seller-component.html',
  styleUrl: './seller-component.css'
})
export class SellerComponent {

  bonus: number = 50;
  sexo: string = '';

}