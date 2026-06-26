import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SellerInterface } from '../../interface/SellerInterface';
import { SellerService } from '../../services/seller-service';

@Component({
  selector: 'app-seller-component',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './seller-component.html',
  styleUrl: './seller-component.css'
})
export class SellerComponent implements OnInit {

  sellers = signal<SellerInterface[]>([]);

  sellerForm!: FormGroup;

  constructor(
    private sellerService: SellerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    this.sellerForm = this.fb.group({
  name: [
    '',
    [
      Validators.required,
      Validators.minLength(5)
    ]
  ],

  gender: [
    '',
    Validators.required
  ],

  salary: [
    0,
    [
      Validators.required,
      Validators.min(1)
    ]
  ],

  bonus: [
    0,
    Validators.min(0)
  ]
});

    this.loadSellers();
  }

  loadSellers(): void {
    this.sellerService.getAll().subscribe({
      next: (data) => this.sellers.set(data),
      error: (err) => console.error(err)
    });
  }

  save(): void {

  if (this.sellerForm.invalid) {

    this.sellerForm.markAllAsTouched();

    if (this.sellerForm.get('name')?.hasError('required')) {
      alert('O nome é obrigatório.');
      return;
    }

    if (this.sellerForm.get('name')?.hasError('minlength')) {
      alert('O nome deve possuir pelo menos 5 caracteres.');
      return;
    }

    if (this.sellerForm.get('gender')?.hasError('required')) {
      alert('Selecione um sexo.');
      return;
    }

    if (this.sellerForm.get('salary')?.hasError('required')) {
      alert('Informe o salário.');
      return;
    }

    if (this.sellerForm.get('salary')?.hasError('min')) {
      alert('O salário deve ser maior que zero.');
      return;
    }

    if (this.sellerForm.get('bonus')?.hasError('min')) {
      alert('O bônus não pode ser negativo.');
      return;
    }
  }

  const seller: SellerInterface = this.sellerForm.value;

  this.sellerService.create(seller).subscribe({

    next: () => {

      alert('Vendedor cadastrado com sucesso!');

      this.loadSellers();

      this.sellerForm.reset({
        name: '',
        gender: '',
        salary: 0,
        bonus: 0
      });

    },

    error: () => {
      alert('Erro ao cadastrar vendedor.');
    }
  });
}
}