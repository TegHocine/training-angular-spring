import { CommonModule } from '@angular/common'; // ✅ Import CommonModule
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
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
import { Product } from '../../types/product.type';

@Component({
  selector: 'app-product-detail-component',
  standalone: true,
  imports: [
    CommonModule,
    Dialog,
    ButtonModule,
    InputTextModule,
    Select,
    ReactiveFormsModule,
  ],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() product: Product | null = null;
  @Input() categories: Category[] = [];
  @Output() onClose = new EventEmitter();

  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private messageService: MessageService
  ) {
    this.productForm = this.fb.group({
      id: this.product?.id || 0,
      name: [this.product?.name || '', Validators.required],
      description: [this.product?.description || '', Validators.required],
      price: [
        this.product?.price || null,
        [Validators.required, Validators.min(0)],
      ],
      quantity: [
        this.product?.quantity || null,
        [Validators.required, Validators.min(1)],
      ],
      category_id: [this.product?.category?.id || null, Validators.required],
    });
  }

  onCloseEmit() {
    this.onClose.emit();
  }

  onUpdate() {
    if (this.productForm.valid) {
      this.productService
        .update(this.productForm.value)
        .pipe(
          take(1),
          catchError(() => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail:
                'Erreur lors de la modification du produit. Veuillez réessayer.',
              life: 3000,
            });
            this.onCloseEmit();
            return of(null);
          })
        )
        .subscribe(() => {
          this.onCloseEmit();
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Produit modifié avec succès.',
            life: 3000,
          });
        });
      this.productForm.reset();
      this.visible = false;
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.productForm.patchValue({
        id: this.product.id,
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        quantity: this.product.quantity,
        category_id: this.product.category?.id || null,
      });
    }
  }
}
