package com.pl.training_spring.controllers;

import com.pl.training_spring.dtos.CategoryDtoIn;
import com.pl.training_spring.dtos.CategoryDtoOut;
import com.pl.training_spring.service.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/categories")
@Slf4j
public class CategoryController {
 final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<CategoryDtoOut>> getCategories() {
        return ResponseEntity.ok(categoryService.getCategories());
    }

    @PostMapping
    public ResponseEntity<CategoryDtoOut> createCategory(@RequestBody CategoryDtoIn categoryDtoIn) {
        return ResponseEntity.ok(categoryService.addCategory(categoryDtoIn));
    }
}
