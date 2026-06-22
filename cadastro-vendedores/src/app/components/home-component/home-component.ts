import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { SellerInterface } from '../../interface/SellerInterface';
import { SellerService } from '../../services/seller-service';

@Component({
  selector: 'app-home-component',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent implements OnInit {

  sellers = signal<SellerInterface[]>([]);
  selectedSeller = signal<SellerInterface | null>(null);

  editForm!: FormGroup;

  constructor(
    private sellerService: SellerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    this.editForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      salary: [0, Validators.required],
      bonus: [0]
    });

    this.loadSellers();
  }

  loadSellers(): void {
    this.sellerService.getAll().subscribe({
      next: (data) => {
        this.sellers.set(data);
      },
      error: (err) => {
        console.error('Erro ao buscar vendedores', err);
      }
    });
  }

  edit(seller: SellerInterface): void {

    this.selectedSeller.set({ ...seller });

    this.editForm.patchValue({
      name: seller.name,
      gender: seller.gender,
      salary: seller.salary,
      bonus: seller.bonus
    });
  }

  update(): void {

    const selected = this.selectedSeller();

    if (!selected) {
      return;
    }

    const sellerUpdated: SellerInterface = {
      ...selected,
      ...this.editForm.value
    };

    this.sellerService.update(
      selected.id,
      sellerUpdated
    ).subscribe({

      next: () => {

        this.loadSellers();

        this.selectedSeller.set(null);

        this.editForm.reset({
          name: '',
          gender: '',
          salary: 0,
          bonus: 0
        });
      },

      error: (err) => {
        console.error('Erro ao atualizar vendedor', err);
      }
    });
  }

  cancelEdit(): void {

    this.selectedSeller.set(null);

    this.editForm.reset({
      name: '',
      gender: '',
      salary: 0,
      bonus: 0
    });
  }

  remove(id: number): void {

  if (!confirm('Deseja realmente excluir este vendedor?')) {
    return;
  }

  this.sellerService.delete(id).subscribe({

    next: () => {

      this.sellers.update(
        sellers => sellers.filter(
          seller => seller.id !== id
        )
      );

    },

    error: (err) => {
      console.error('Erro ao excluir vendedor', err);
    }

  });
}
  
}