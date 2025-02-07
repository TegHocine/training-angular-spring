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
    public ResponseEntity<List<ProductDtoOut>> getProducts(@RequestParam(required = false) String name,
                                                           @RequestParam(required = false) Long category,
                                                           @RequestParam(required = false) Integer minPrice,
                                                           @RequestParam(required = false) Integer maxPrice) {
        return ResponseEntity.ok(productService.getProducts(
                name,
                category != null ? category : 0L,
                minPrice != null ? minPrice : 0,
                maxPrice != null ? maxPrice : Integer.MAX_VALUE
        ));
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
