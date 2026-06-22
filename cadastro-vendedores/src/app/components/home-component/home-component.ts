import { Component, signal } from '@angular/core';
import { SellerInterface } from '../../interface/SellerInterface';
import { SellerService } from '../../services/seller-service';

@Component({
  selector: 'app-home-component',
  imports: [],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {

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
