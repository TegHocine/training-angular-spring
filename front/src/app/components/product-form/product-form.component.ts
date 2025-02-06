import { CommonModule } from '@angular/common'; // ✅ Import CommonModule
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
import { CreateProduct } from '../../types/product.type';

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
  @Output() onSave = new EventEmitter<CreateProduct>();

  constructor(private fb: FormBuilder) {
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

  saveProduct() {
    if (this.productForm.valid) {
      this.onSave.emit(this.productForm.value);
      this.productForm.reset();
      this.visible = false;
    } else {
      this.productForm.markAllAsTouched();
    }
  }
}
