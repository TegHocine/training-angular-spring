package com.pl.training_spring.controllers;

import com.pl.training_spring.dtos.ProductDtoIn;
import com.pl.training_spring.dtos.ProductDtoOut;
import com.pl.training_spring.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/products")
public class ProductController {
    final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductDtoOut>> getProducts() {
        return ResponseEntity.ok(productService.getProducts());
    }

    @PostMapping
    public ResponseEntity<ProductDtoOut> addProduct(@RequestBody ProductDtoIn productDtoIn) {
        return ResponseEntity.ok(productService.addProduct(productDtoIn));
    }

    @PutMapping("/{productId}")
    public ResponseEntity<ProductDtoOut> UpdateProduct(@PathVariable Long productId, @RequestBody ProductDtoIn productDtoIn) {
        return ResponseEntity.ok(productService.updateProduct(productId,productDtoIn));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId) {
        productService.deleteProduct(productId);
        return ResponseEntity.ok().build();
    }

}
