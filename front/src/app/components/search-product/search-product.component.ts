import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { debounceTime } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import { Category } from '../../types/category.type';

@Component({
  selector: 'app-search-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IftaLabelModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    SliderModule,
    FormsModule,
    Select,
  ],
  templateUrl: './search-product.component.html',
})
export class SearchProductComponent {
  @Input() categories: Category[] = [];
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.searchForm = this.fb.group({
      name: [''],
      category: [null],
      priceRange: [[0, 999]],
    });
  }

  onReset() {
    this.searchForm.reset({
      name: '',
      category: null,
      priceRange: [0, 999],
    });

    this.searchForm.updateValueAndValidity();
  }

  ngOnInit() {
    this.searchForm.valueChanges.pipe(debounceTime(300)).subscribe((values) => {
      this.productService.setParams(values);
    });
  }
}
