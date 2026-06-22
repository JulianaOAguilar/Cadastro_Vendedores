import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerInterface } from '../../interface/SellerInterface';
import { SellerService } from '../../services/seller-service';

@Component({
  selector: 'app-seller-component',
  imports: [FormsModule],
  templateUrl: './seller-component.html',
  styleUrl: './seller-component.css'
})
export class SellerComponent implements OnInit {

  sellers = signal<SellerInterface[]>([]);

  bonus: number = 50;
  sexo: string = '';

  constructor(private sellerService: SellerService) {}

  ngOnInit(): void {
    this.sellerService.getAll().subscribe({
      next: (data) => {
        this.sellers.set(data);
      },
      error: (err) => {
        console.error('Erro ao buscar vendedores', err);
      }
    });
  }
}