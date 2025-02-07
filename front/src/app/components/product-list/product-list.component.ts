import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { catchError, of, take } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types/product.type';

@Component({
  selector: 'app-product-list-component',
  imports: [TableModule, ButtonModule, CardModule, CommonModule],
  templateUrl: './product-list.component.html',
  standalone: true,
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Output() onEdit = new EventEmitter<Product>();

  constructor(
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  onDelete(id: number) {
    this.productService
      .delete(id)
      .pipe(
        take(1),
        catchError(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail:
              'Erreur lors de la suppression du produit. Veuillez réessayer.',
            life: 3000,
          });
          return of(null);
        })
      )
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Produit supprimé avec succès.',
          life: 3000,
        });
      });
  }

  onEditClick(product: Product) {
    this.onEdit.emit(product);
  }
}
