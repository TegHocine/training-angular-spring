import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Product } from '../../types/product.type';

@Component({
  selector: 'app-product-list-component',
  imports: [TableModule, ButtonModule, CardModule, CommonModule],
  templateUrl: './product-list.component.html',
  standalone: true,
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Output() onDelete = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<Product>();

  onDeleteClick(id: number) {
    this.onDelete.emit(id);
  }

  onEditClick(product: Product) {
    this.onEdit.emit(product);
  }
}
