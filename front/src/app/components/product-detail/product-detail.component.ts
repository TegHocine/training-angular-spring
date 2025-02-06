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
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Category } from '../../types/category.type';
import { CreateProduct, Product } from '../../types/product.type';

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
  @Output() onSave = new EventEmitter<CreateProduct>();
  @Output() onClose = new EventEmitter();

  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
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

  onCancelClick() {
    this.onClose.emit();
  }

  saveProduct() {
    if (this.productForm.valid) {
      this.onSave.emit(this.productForm.value);
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
