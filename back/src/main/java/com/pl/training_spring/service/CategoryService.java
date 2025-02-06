package com.pl.training_spring.service;

import com.pl.training_spring.dtos.CategoryDtoIn;
import com.pl.training_spring.dtos.CategoryDtoOut;
import com.pl.training_spring.entities.Category;
import com.pl.training_spring.mappers.CategoryMapper;
import com.pl.training_spring.repositories.CategoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class CategoryService {
    final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryDtoOut> getCategories() {
        List<Category> categories = categoryRepository.findAll();
        return CategoryMapper.INSTANCE.categoriesToCategoryDtoOuts(categories);
    }

    public CategoryDtoOut addCategory(CategoryDtoIn categoryDtoIn) {
        Category category = CategoryMapper.INSTANCE.categoryDtoInToCategory(categoryDtoIn);
        log.info("Mapping to category: {}", category);
        Category savedCategory = categoryRepository.save(category);
        log.info("Saved category: {}", savedCategory);
        return CategoryMapper.INSTANCE.categoryToCategoryDtoOut(savedCategory);
    }

    public Optional<Category> getCategoryById(Long categoryId) {
        return categoryRepository.findById(categoryId);
    }
}
