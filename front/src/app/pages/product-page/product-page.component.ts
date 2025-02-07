import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

import { ProductDetailComponent } from '../../components/product-detail/product-detail.component';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { SearchProductComponent } from '../../components/search-product/search-product.component';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { Category } from '../../types/category.type';
import { Product } from '../../types/product.type';

@Component({
  selector: 'app-product-page',
  imports: [
    ProductListComponent,
    ProductFormComponent,
    ProductDetailComponent,
    SearchProductComponent,
    CommonModule,
  ],
  providers: [ProductService],
  templateUrl: './product-page.html',
  standalone: true,
})
export class ProductPage {
  products: Product[] = [];
  categories: Category[] = [];
  visible: boolean = false;
  selectedProduct: Product | null = null;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private messageService: MessageService
  ) {
    this.productService.get().subscribe();
    this.productService.collaborators$.subscribe((data) => {
      this.products = data;
    });

    this.categoryService.get().subscribe();
    this.categoryService.categories$.subscribe((data) => {
      this.categories = data;
    });
  }

  onShow() {
    this.visible = true;
  }
  onClose() {
    this.visible = false;
  }

  onEdit(product: Product) {
    this.selectedProduct = product;
    this.onShow();
  }
}
