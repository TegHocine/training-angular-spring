package com.pl.training_spring.service;

import com.pl.training_spring.dtos.ProductDtoIn;
import com.pl.training_spring.dtos.ProductDtoOut;
import com.pl.training_spring.entities.Category;
import com.pl.training_spring.entities.Product;
import com.pl.training_spring.mappers.ProductMapper;
import com.pl.training_spring.repositories.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class ProductService {
    final ProductRepository productRepository;
    final CategoryService categoryService;

    public ProductService(ProductRepository productRepository, CategoryService categoryService) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
    }


    public List<ProductDtoOut> getProducts(String name, Long category, Integer minPrice, Integer maxPrice) {
        List<Product> products = productRepository.searchProducts(name, category, minPrice, maxPrice);
        return ProductMapper.INSTANCE.productToProductDtoOuts(products);
    }

    public ProductDtoOut addProduct(ProductDtoIn productDtoIn) {
        Product product = ProductMapper.INSTANCE.productDtoInToProduct(productDtoIn);
        Category category = categoryService.getCategoryById(productDtoIn.getCategory_id()).orElse(null);
        product.setCategory(category);
        log.info("Mapping to product: {}", product);
        Product savedProduct = productRepository.save(product);
        log.info("Saved product: {}", savedProduct);
        return  ProductMapper.INSTANCE.productToProductDtoOut(savedProduct);
    }


    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }

    public ProductDtoOut updateProduct(Long productId, ProductDtoIn productDtoIn) {
        Product product = productRepository.findById(productId).orElseThrow(() ->
                new EntityNotFoundException("Product not found with ID: " + productId)
        );

        if (productDtoIn.getName() != null) {
            product.setName(productDtoIn.getName());
        }
        if (productDtoIn.getPrice() != null) {
            product.setPrice(productDtoIn.getPrice());
        }
        if (productDtoIn.getDescription() != null) {
            product.setDescription(productDtoIn.getDescription());
        }
        if (productDtoIn.getCategory_id() != null) {
            product.setCategory(categoryService.getCategoryById(productDtoIn.getCategory_id()).orElse(product.getCategory()));
        }

        Product updatedProduct = productRepository.save(product);

        return ProductMapper.INSTANCE.productToProductDtoOut(updatedProduct);
    }


}
