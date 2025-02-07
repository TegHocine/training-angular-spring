import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

import { catchError, of, take } from 'rxjs';
import { ProductDetailComponent } from '../../components/product-detail/product-detail.component';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { SearchProductComponent } from '../../components/search-product/search-product.component';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { Category } from '../../types/category.type';
import { CreateProduct, Product } from '../../types/product.type';

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

  onUpdate(newProduct: CreateProduct) {
    this.productService
      .update(newProduct)
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
          this.onClose();
          return of(null);
        })
      )
      .subscribe(() => {
        this.onClose();
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Produit modifié avec succès.',
          life: 3000,
        });
      });
  }
}
