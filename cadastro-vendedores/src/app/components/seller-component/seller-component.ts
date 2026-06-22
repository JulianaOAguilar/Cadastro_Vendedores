import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
      name: [''],
      gender: [''],
      salary: [0],
      bonus: [0]
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
      return;
    }

    const seller: SellerInterface = this.sellerForm.value;

    this.sellerService.create(seller).subscribe({
      next: () => {

        this.loadSellers();

        this.sellerForm.reset({
          name: '',
          gender: '',
          salary: 0,
          bonus: 0
        });

      },
      error: (err) => {
        console.error('Erro ao cadastrar vendedor', err);
      }
    });
  }
}