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
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]
    ],

    gender: [
      '',
      Validators.required
    ],

    salary: [
      null,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],

    bonus: [
      0,
      [
        Validators.min(0)
      ]
    ]
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

  if (this.editForm.invalid) {

    if (this.editForm.get('name')?.hasError('required')) {
      alert('O nome é obrigatório.');
      return;
    }

    if (this.editForm.get('name')?.hasError('minlength')) {
      alert('O nome deve ter pelo menos 3 caracteres.');
      return;
    }

    if (this.editForm.get('gender')?.hasError('required')) {
      alert('Selecione o gênero.');
      return;
    }

    if (this.editForm.get('salary')?.hasError('required')) {
      alert('Informe o salário.');
      return;
    }

    if (this.editForm.get('salary')?.hasError('min')) {
      alert('O salário deve ser maior que zero.');
      return;
    }

    if (this.editForm.get('bonus')?.hasError('min')) {
      alert('O bônus não pode ser negativo.');
      return;
    }
  }

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
      alert('Vendedor atualizado com sucesso!');

      this.loadSellers();

      this.selectedSeller.set(null);

      this.editForm.reset({
        name: '',
        gender: '',
        salary: 0,
        bonus: 0
      });
    },

    error: () => {
      alert('Erro ao atualizar o vendedor.');
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