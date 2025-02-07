import { CommonModule } from '@angular/common'; // ✅ Import CommonModule
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { catchError, of, take } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Category } from '../../types/category.type';

@Component({
  selector: 'app-product-form-component',
  standalone: true,
  imports: [
    CommonModule,
    Dialog,
    ButtonModule,
    InputTextModule,
    Select,
    ReactiveFormsModule,
  ],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent {
  visible: boolean = false;
  productForm: FormGroup;
  @Input() categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,

    private messageService: MessageService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      quantity: [null, [Validators.required, Validators.min(1)]],
      category_id: [null, Validators.required],
    });
  }

  showDialog() {
    this.visible = true;
  }

  onSave() {
    if (this.productForm.valid) {
      this.productService
        .add(this.productForm.value)
        .pipe(
          take(1),
          catchError(() => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail:
                'Impossible d’ajouter le produit. Veuillez réessayer plus tard.',
              life: 3000,
            });
            return of(null);
          })
        )
        .subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Produit ajouté avec succès.',
            life: 3000,
          });
        });
      this.productForm.reset();
      this.visible = false;
    } else {
      this.productForm.markAllAsTouched();
    }
  }
}
